"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vega_util_1 = require("vega-util");
var channel_1 = require("./channel");
var fielddef_1 = require("./fielddef");
var log = require("./log");
var type_1 = require("./type");
var util_1 = require("./util");
function channelHasField(encoding, channel) {
    var channelDef = encoding && encoding[channel];
    if (channelDef) {
        if (vega_util_1.isArray(channelDef)) {
            return util_1.some(channelDef, function (fieldDef) { return !!fieldDef.field; });
        }
        else {
            return fielddef_1.isFieldDef(channelDef) || fielddef_1.hasConditionalFieldDef(channelDef);
        }
    }
    return false;
}
exports.channelHasField = channelHasField;
function isAggregate(encoding) {
    return util_1.some(channel_1.CHANNELS, function (channel) {
        if (channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            if (vega_util_1.isArray(channelDef)) {
                return util_1.some(channelDef, function (fieldDef) { return !!fieldDef.aggregate; });
            }
            else {
                var fieldDef = fielddef_1.getFieldDef(channelDef);
                return fieldDef && !!fieldDef.aggregate;
            }
        }
        return false;
    });
}
exports.isAggregate = isAggregate;
function normalizeEncoding(encoding, mark) {
    return util_1.keys(encoding).reduce(function (normalizedEncoding, channel) {
        if (!channel_1.isChannel(channel)) {
            // Drop invalid channel
            log.warn(log.message.invalidEncodingChannel(channel));
            return normalizedEncoding;
        }
        if (!channel_1.supportMark(channel, mark)) {
            // Drop unsupported channel
            log.warn(log.message.incompatibleChannel(channel, mark));
            return normalizedEncoding;
        }
        // Drop line's size if the field is aggregated.
        if (channel === 'size' && mark === 'line') {
            var fieldDef = fielddef_1.getFieldDef(encoding[channel]);
            if (fieldDef && fieldDef.aggregate) {
                log.warn(log.message.LINE_WITH_VARYING_SIZE);
                return normalizedEncoding;
            }
        }
        // Drop color if either fill or stroke is specified
        if (channel === 'color' && ('fill' in encoding || 'stroke' in encoding)) {
            log.warn(log.message.droppingColor('encoding', { fill: 'fill' in encoding, stroke: 'stroke' in encoding }));
            return normalizedEncoding;
        }
        if (channel === 'detail' || channel === 'order' || (channel === 'tooltip' && vega_util_1.isArray(encoding[channel]))) {
            var channelDef = encoding[channel];
            if (channelDef) {
                // Array of fieldDefs for detail channel (or production rule)
                normalizedEncoding[channel] = (vega_util_1.isArray(channelDef) ? channelDef : [channelDef])
                    .reduce(function (defs, fieldDef) {
                    if (!fielddef_1.isFieldDef(fieldDef)) {
                        log.warn(log.message.emptyFieldDef(fieldDef, channel));
                    }
                    else {
                        defs.push(fielddef_1.normalizeFieldDef(fieldDef, channel));
                    }
                    return defs;
                }, []);
            }
        }
        else {
            // FIXME: remove this casting.  (I don't know why Typescript doesn't infer this correctly here.)
            var channelDef = encoding[channel];
            var fieldDef = fielddef_1.getFieldDef(encoding[channel]);
            if (fieldDef && util_1.contains([type_1.Type.LATITUDE, type_1.Type.LONGITUDE], fieldDef.type)) {
                var _a = channel, _ = normalizedEncoding[_a], newEncoding = tslib_1.__rest(normalizedEncoding, [typeof _a === "symbol" ? _a : _a + ""]);
                var newChannel = channel === 'x' ? 'longitude' :
                    channel === 'y' ? 'latitude' :
                        channel === 'x2' ? 'longitude2' :
                            channel === 'y2' ? 'latitude2' : undefined;
                log.warn(log.message.latLongDeprecated(channel, fieldDef.type, newChannel));
                return tslib_1.__assign({}, newEncoding, (_b = {}, _b[newChannel] = tslib_1.__assign({}, fielddef_1.normalize(fieldDef, channel), { type: 'quantitative' }), _b));
            }
            if (!fielddef_1.isFieldDef(channelDef) && !fielddef_1.isValueDef(channelDef) && !fielddef_1.isConditionalDef(channelDef)) {
                log.warn(log.message.emptyFieldDef(channelDef, channel));
                return normalizedEncoding;
            }
            normalizedEncoding[channel] = fielddef_1.normalize(channelDef, channel);
        }
        return normalizedEncoding;
        var _b;
    }, {});
}
exports.normalizeEncoding = normalizeEncoding;
function isRanged(encoding) {
    return encoding && ((!!encoding.x && !!encoding.x2) || (!!encoding.y && !!encoding.y2));
}
exports.isRanged = isRanged;
function fieldDefs(encoding) {
    var arr = [];
    channel_1.CHANNELS.forEach(function (channel) {
        if (channelHasField(encoding, channel)) {
            var channelDef = encoding[channel];
            (vega_util_1.isArray(channelDef) ? channelDef : [channelDef]).forEach(function (def) {
                if (fielddef_1.isFieldDef(def)) {
                    arr.push(def);
                }
                else if (fielddef_1.hasConditionalFieldDef(def)) {
                    arr.push(def.condition);
                }
            });
        }
    });
    return arr;
}
exports.fieldDefs = fieldDefs;
function forEach(mapping, f, thisArg) {
    if (!mapping) {
        return;
    }
    var _loop_1 = function (channel) {
        if (vega_util_1.isArray(mapping[channel])) {
            mapping[channel].forEach(function (channelDef) {
                f.call(thisArg, channelDef, channel);
            });
        }
        else {
            f.call(thisArg, mapping[channel], channel);
        }
    };
    for (var _i = 0, _a = util_1.keys(mapping); _i < _a.length; _i++) {
        var channel = _a[_i];
        _loop_1(channel);
    }
}
exports.forEach = forEach;
function reduce(mapping, f, init, thisArg) {
    if (!mapping) {
        return init;
    }
    return util_1.keys(mapping).reduce(function (r, channel) {
        var map = mapping[channel];
        if (vega_util_1.isArray(map)) {
            return map.reduce(function (r1, channelDef) {
                return f.call(thisArg, r1, channelDef, channel);
            }, r);
        }
        else {
            return f.call(thisArg, r, map, channel);
        }
    }, init);
}
exports.reduce = reduce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5jb2RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQWtDO0FBQ2xDLHFDQUFvRTtBQUVwRSx1Q0FrQm9CO0FBQ3BCLDJCQUE2QjtBQUU3QiwrQkFBNEI7QUFDNUIsK0JBQTRDO0FBOEk1Qyx5QkFBZ0MsUUFBa0MsRUFBRSxPQUFnQjtJQUNsRixJQUFNLFVBQVUsR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELElBQUksVUFBVSxFQUFFO1FBQ2QsSUFBSSxtQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sV0FBSSxDQUFDLFVBQVUsRUFBRSxVQUFDLFFBQVEsSUFBSyxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFoQixDQUFnQixDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLE9BQU8scUJBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxpQ0FBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyRTtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBVkQsMENBVUM7QUFHRCxxQkFBNEIsUUFBa0M7SUFDNUQsT0FBTyxXQUFJLENBQUMsa0JBQVEsRUFBRSxVQUFDLE9BQU87UUFDNUIsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3RDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxJQUFJLG1CQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sV0FBSSxDQUFDLFVBQVUsRUFBRSxVQUFDLFFBQVEsSUFBSyxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFwQixDQUFvQixDQUFDLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0wsSUFBTSxRQUFRLEdBQUcsc0JBQVcsQ0FBQyxVQUFVLENBQUMs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LENBQUMsQ0FBQyxDQUFDO1NBQ1A7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNYLENBQUM7QUFqQkQsd0JBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge2lzQXJyYXl9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQge0NoYW5uZWwsIENIQU5ORUxTLCBpc0NoYW5uZWwsIHN1cHBvcnRNYXJrfSBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IHtGYWNldE1hcHBpbmd9IGZyb20gJy4vZmFjZXQnO1xuaW1wb3J0IHtcbiAgQ2hhbm5lbERlZixcbiAgRmllbGQsXG4gIEZpZWxkRGVmLFxuICBGaWVsZERlZldpdGhDb25kaXRpb24sXG4gIGdldEZpZWxkRGVmLFxuICBoYXNDb25kaXRpb25hbEZpZWxkRGVmLFxuICBpc0NvbmRpdGlvbmFsRGVmLFxuICBpc0ZpZWxkRGVmLFxuICBpc1ZhbHVlRGVmLFxuICBNYXJrUHJvcEZpZWxkRGVmLFxuICBub3JtYWxpemUsXG4gIG5vcm1hbGl6ZUZpZWxkRGVmLFxuICBPcmRlckZpZWxkRGVmLFxuICBQb3NpdGlvbkZpZWxkRGVmLFxuICBUZXh0RmllbGREZWYsXG4gIFZhbHVlRGVmLFxuICBWYWx1ZURlZldpdGhDb25kaXRpb25cbn0gZnJvbSAnLi9maWVsZGRlZic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHtNYXJrfSBmcm9tICcuL21hcmsnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHtjb250YWlucywga2V5cywgc29tZX0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBFbmNvZGluZzxGPiB7XG4gIC8qKlxuICAgKiBYIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXJrcywgb3Igd2lkdGggb2YgaG9yaXpvbnRhbCBgXCJiYXJcImAgYW5kIGBcImFyZWFcImAuXG4gICAqL1xuICB4PzogUG9zaXRpb25GaWVsZERlZjxGPiB8IFZhbHVlRGVmO1xuXG4gIC8qKlxuICAgKiBZIGNvb3JkaW5hdGVzIG9mIHRoZSBtYXJrcywgb3IgaGVpZ2h0IG9mIHZlcnRpY2FsIGBcImJhclwiYCBhbmQgYFwiYXJlYVwiYC5cbiAgICovXG4gIHk/OiBQb3NpdGlvbkZpZWxkRGVmPEY+IHwgVmFsdWVEZWY7XG5cbiAgLyoqXG4gICAqIFgyIGNvb3JkaW5hdGVzIGZvciByYW5nZWQgYFwiYXJlYVwiYCwgYFwiYmFyXCJgLCBgXCJyZWN0XCJgLCBhbmQgIGBcInJ1bGVcImAuXG4gICAqL1xuICAvLyBUT0RPOiBIYW0gbmVlZCB0byBhZGQgZGVmYXVsdCBiZWhhdmlvclxuICB4Mj86IEZpZWxkRGVmPEY+IHwgVmFsdWVEZWY7XG5cbiAgLyoqXG4gICAqIFkyIGNvb3JkaW5hdGVzIGZvciByYW5nZWQgYFwiYXJlYVwiYCwgYFwiYmFyXCJgLCBgXCJyZWN0XCJgLCBhbmQgIGBcInJ1bGVcImAuXG4gICAqL1xuICAvLyBUT0RPOiBIYW0gbmVlZCB0byBhZGQgZGVmYXVsdCBiZWhhdmlvclxuICB5Mj86IEZpZWxkRGVmPEY+IHwgVmFsdWVEZWY7XG5cblxuICAvKipcbiAgICogTG9uZ2l0dWRlIHBvc2l0aW9uIG9mIGdlb2dyYXBoaWNhbGx5IHByb2plY3RlZCBtYXJrcy5cbiAgICovXG4gIGxvbmdpdHVkZT86IEZpZWxkRGVmPEY+O1xuXG4gIC8qKlxuICAgKiBMYXRpdHVkZSBwb3NpdGlvbiBvZiBnZW9ncmFwaGljYWxseSBwcm9qZWN0ZWQgbWFya3MuXG4gICAqL1xuICBsYXRpdHVkZT86IEZpZWxkRGVmPEY+O1xuXG4gIC8qKlxuICAgKiBMb25naXR1ZGUtMiBwb3NpdGlvbiBmb3IgZ2VvZ3JhcGhpY2FsbHkgcHJvamVjdGVkIHJhbmdlZCBgXCJhcmVhXCJgLCBgXCJiYXJcImAsIGBcInJlY3RcImAsIGFuZCAgYFwicnVsZVwiYC5cbiAgICovXG4gIGxvbmdpdHVkZTI/OiBGaWVsZERlZjxGPjtcblxuICAvKipcbiAgICogTGF0aXR1ZGUtMiBwb3NpdGlvbiBmb3IgZ2VvZ3JhcGhpY2FsbHkgcHJvamVjdGVkIHJhbmdlZCBgXCJhcmVhXCJgLCBgXCJiYXJcImAsIGBcInJlY3RcImAsIGFuZCAgYFwicnVsZVwiYC5cbiAgICovXG4gIGxhdGl0dWRlMj86IEZpZWxkRGVmPEY+O1xuXG4gIC8qKlxuICAgKiBDb2xvciBvZiB0aGUgbWFya3Mg4oCTIGVpdGhlciBmaWxsIG9yIHN0cm9rZSBjb2xvciBiYXNlZCBvbiAgdGhlIGBmaWxsZWRgIHByb3BlcnR5IG9mIG1hcmsgZGVmaW5pdGlvbi5cbiAgICogQnkgZGVmYXVsdCwgYGNvbG9yYCByZXByZXNlbnRzIGZpbGwgY29sb3IgZm9yIGBcImFyZWFcImAsIGBcImJhclwiYCwgYFwidGlja1wiYCxcbiAgICogYFwidGV4dFwiYCwgYFwidHJhaWxcImAsIGBcImNpcmNsZVwiYCwgYW5kIGBcInNxdWFyZVwiYCAvIHN0cm9rZSBjb2xvciBmb3IgYFwibGluZVwiYCBhbmQgYFwicG9pbnRcImAuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBJZiB1bmRlZmluZWQsIHRoZSBkZWZhdWx0IGNvbG9yIGRlcGVuZHMgb24gW21hcmsgY29uZmlnXShjb25maWcuaHRtbCNtYXJrKSdzIGBjb2xvcmAgcHJvcGVydHkuXG4gICAqXG4gICAqIF9Ob3RlOl9cbiAgICogMSkgRm9yIGZpbmUtZ3JhaW5lZCBjb250cm9sIG92ZXIgYm90aCBmaWxsIGFuZCBzdHJva2UgY29sb3JzIG9mIHRoZSBtYXJrcywgcGxlYXNlIHVzZSB0aGUgYGZpbGxgIGFuZCBgc3Ryb2tlYCBjaGFubmVscy4gIElmIGVpdGhlciBgZmlsbGAgb3IgYHN0cm9rZWAgY2hhbm5lbCBpcyBzcGVjaWZpZWQsIGBjb2xvcmAgY2hhbm5lbCB3aWxsIGJlIGlnbm9yZWQuXG4gICAqIDIpIFNlZSB0aGUgc2NhbGUgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjdXN0b21pemluZyBbY29sb3Igc2NoZW1lXShzY2FsZS5odG1sI3NjaGVtZSkuXG4gICAqL1xuICBjb2xvcj86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PiB8IFZhbHVlRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PjtcblxuICAvKipcbiAgICogRmlsbCBjb2xvciBvZiB0aGUgbWFya3MuXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBJZiB1bmRlZmluZWQsIHRoZSBkZWZhdWx0IGNvbG9yIGRlcGVuZHMgb24gW21hcmsgY29uZmlnXShjb25maWcuaHRtbCNtYXJrKSdzIGBjb2xvcmAgcHJvcGVydHkuXG4gICAqXG4gICAqIF9Ob3RlOl8gV2hlbiB1c2luZyBgZmlsbGAgY2hhbm5lbCwgYGNvbG9yIGAgY2hhbm5lbCB3aWxsIGJlIGlnbm9yZWQuIFRvIGN1c3RvbWl6ZSBib3RoIGZpbGwgYW5kIHN0cm9rZSwgcGxlYXNlIHVzZSBgZmlsbGAgYW5kIGBzdHJva2VgIGNoYW5uZWxzIChub3QgYGZpbGxgIGFuZCBgY29sb3JgKS5cbiAgICovXG4gIGZpbGw/OiBGaWVsZERlZldpdGhDb25kaXRpb248TWFya1Byb3BGaWVsZERlZjxGPj4gfCBWYWx1ZURlZldpdGhDb25kaXRpb248TWFya1Byb3BGaWVsZERlZjxGPj47XG5cblxuICAvKipcbiAgICogU3Ryb2tlIGNvbG9yIG9mIHRoZSBtYXJrcy5cbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIElmIHVuZGVmaW5lZCwgdGhlIGRlZmF1bHQgY29sb3IgZGVwZW5kcyBvbiBbbWFyayBjb25maWddKGNvbmZpZy5odG1sI21hcmspJ3MgYGNvbG9yYCBwcm9wZXJ0eS5cbiAgICpcbiAgICogX05vdGU6XyBXaGVuIHVzaW5nIGBzdHJva2VgIGNoYW5uZWwsIGBjb2xvciBgIGNoYW5uZWwgd2lsbCBiZSBpZ25vcmVkLiBUbyBjdXN0b21pemUgYm90aCBzdHJva2UgYW5kIGZpbGwsIHBsZWFzZSB1c2UgYHN0cm9rZWAgYW5kIGBmaWxsYCBjaGFubmVscyAobm90IGBzdHJva2VgIGFuZCBgY29sb3JgKS5cbiAgICovXG4gIHN0cm9rZT86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PiB8IFZhbHVlRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PjtcblxuXG4gIC8qKlxuICAgKiBPcGFjaXR5IG9mIHRoZSBtYXJrcyDigJMgZWl0aGVyIGNhbiBiZSBhIHZhbHVlIG9yIGEgcmFuZ2UuXG4gICAqXG4gICAqIF9fRGVmYXVsdCB2YWx1ZTpfXyBJZiB1bmRlZmluZWQsIHRoZSBkZWZhdWx0IG9wYWNpdHkgZGVwZW5kcyBvbiBbbWFyayBjb25maWddKGNvbmZpZy5odG1sI21hcmspJ3MgYG9wYWNpdHlgIHByb3BlcnR5LlxuICAgKi9cbiAgb3BhY2l0eT86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PiB8IFZhbHVlRGVmV2l0aENvbmRpdGlvbjxNYXJrUHJvcEZpZWxkRGVmPEY+PjtcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgbWFyay5cbiAgICogLSBGb3IgYFwicG9pbnRcImAsIGBcInNxdWFyZVwiYCBhbmQgYFwiY2lyY2xlXCJgLCDigJMgdGhlIHN5bWJvbCBzaXplLCBvciBwaXhlbCBhcmVhIG9mIHRoZSBtYXJrLlxuICAgKiAtIEZvciBgXCJiYXJcImAgYW5kIGBcInRpY2tcImAg4oCTIHRoZSBiYXIgYW5kIHRpY2sncyBzaXplLlxuICAgKiAtIEZvciBgXCJ0ZXh0XCJgIOKAkyB0aGUgdGV4dCdzIGZvbnQgc2l6ZS5cbiAgICogLSBTaXplIGlzIHVuc3VwcG9ydGVkIGZvciBgXCJsaW5lXCJgLCBgXCJhcmVhXCJgLCBhbmQgYFwicmVjdFwiYC4gKFVzZSBgXCJ0cmFpbFwiYCBpbnN0ZWFkIG9mIGxpbmUgd2l0aCB2YXJ5aW5nIHNpemUpXG4gICAqL1xuICBzaXplPzogRmllbGREZWZXaXRoQ29uZGl0aW9uPE1hcmtQcm9wRmllbGREZWY8Rj4+IHwgVmFsdWVEZWZXaXRoQ29uZGl0aW9uPE1hcmtQcm9wRmllbGREZWY8Rj4+O1xuXG4gIC8qKlxuICAgKiBGb3IgYHBvaW50YCBtYXJrcyB0aGUgc3VwcG9ydGVkIHZhbHVlcyBhcmVcbiAgICogYFwiY2lyY2xlXCJgIChkZWZhdWx0KSwgYFwic3F1YXJlXCJgLCBgXCJjcm9zc1wiYCwgYFwiZGlhbW9uZFwiYCwgYFwidHJpYW5nbGUtdXBcImAsXG4gICAqIG9yIGBcInRyaWFuZ2xlLWRvd25cImAsIG9yIGVsc2UgYSBjdXN0b20gU1ZHIHBhdGggc3RyaW5nLlxuICAgKiBGb3IgYGdlb3NoYXBlYCBtYXJrcyBpdCBzaG91bGQgYmUgYSBmaWVsZCBkZWZpbml0aW9uIG9mIHRoZSBnZW9qc29uIGRhdGFcbiAgICpcbiAgICogX19EZWZhdWx0IHZhbHVlOl9fIElmIHVuZGVmaW5lZCwgdGhlIGRlZmF1bHQgc2hhcGUgZGVwZW5kcyBvbiBbbWFyayBjb25maWddKGNvbmZpZy5odG1sI3BvaW50LWNvbmZpZykncyBgc2hhcGVgIHByb3BlcnR5LlxuICAgKi9cbiAgc2hhcGU/OiBGaWVsZERlZldpdGhDb25kaXRpb248TWFya1Byb3BGaWVsZERlZjxGPj4gfCBWYWx1ZURlZldpdGhDb25kaXRpb248TWFya1Byb3BGaWVsZERlZjxGPj47IC8vIFRPRE86IG1heWJlIGRpc3Rpbmd1aXNoIG9yZGluYWwtb25seVxuXG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIGxldmVscyBvZiBkZXRhaWwgZm9yIGdyb3VwaW5nIGRhdGEgaW4gYWdncmVnYXRlIHZpZXdzIGFuZFxuICAgKiBpbiBsaW5lLCB0cmFpbCwgYW5kIGFyZWEgbWFya3Mgd2l0aG91dCBtYXBwaW5nIGRhdGEgdG8gYSBzcGVjaWZpYyB2aXN1YWwgY2hhbm5lbC5cbiAgICovXG4gIGRldGFpbD86IEZpZWxkRGVmPEY+IHwgRmllbGREZWY8Rj5bXTtcblxuICAvKipcbiAgICogQSBkYXRhIGZpZWxkIHRvIHVzZSBhcyBhIHVuaXF1ZSBrZXkgZm9yIGRhdGEgYmluZGluZy4gV2hlbiBhIHZpc3VhbGl6YXRpb27igJlzIGRhdGEgaXMgdXBkYXRlZCwgdGhlIGtleSB2YWx1ZSB3aWxsIGJlIHVzZWQgdG8gbWF0Y2ggZGF0YSBlbGVtZW50cyB0byBleGlzdGluZyBtYXJrIGluc3RhbmNlcy4gVXNlIGEga2V5IGNoYW5uZWwgdG8gZW5hYmxlIG9iamVjdCBjb25zdGFuY3kgZm9yIHRyYW5zaXRpb25zIG92ZXIgZHluYW1pYyBkYXRhLlxuICAgKi9cbiAga2V5PzogRmllbGREZWY8Rj47XG5cbiAgLyoqXG4gICAqIFRleHQgb2YgdGhlIGB0ZXh0YCBtYXJrLlxuICAgKi9cbiAgdGV4dD86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxUZXh0RmllbGREZWY8Rj4+IHwgVmFsdWVEZWZXaXRoQ29uZGl0aW9uPFRleHRGaWVsZERlZjxGPj47XG5cbiAgLyoqXG4gICAqIFRoZSB0b29sdGlwIHRleHQgdG8gc2hvdyB1cG9uIG1vdXNlIGhvdmVyLlxuICAgKi9cbiAgdG9vbHRpcD86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxUZXh0RmllbGREZWY8Rj4+IHwgVmFsdWVEZWZXaXRoQ29uZGl0aW9uPFRleHRGaWVsZERlZjxGPj4gfCBUZXh0RmllbGREZWY8Rj5bXTtcblxuICAvKipcbiAgICogQSBVUkwgdG8gbG9hZCB1cG9uIG1vdXNlIGNsaWNrLlxuICAgKi9cbiAgaHJlZj86IEZpZWxkRGVmV2l0aENvbmRpdGlvbjxGaWVsZERlZjxGPj4gfCBWYWx1ZURlZldpdGhDb25kaXRpb248RmllbGREZWY8Rj4+O1xuXG4gIC8qKlxuICAgKiBPcmRlciBvZiB0aGUgbWFya3MuXG4gICAqIC0gRm9yIHN0YWNrZWQgbWFya3MsIHRoaXMgYG9yZGVyYCBjaGFubmVsIGVuY29kZXMgW3N0YWNrIG9yZGVyXShodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL3N0YWNrLmh0bWwjb3JkZXIpLlxuICAgKiAtIEZvciBsaW5lIGFuZCB0cmFpbCBtYXJrcywgdGhpcyBgb3JkZXJgIGNoYW5uZWwgZW5jb2RlcyBvcmRlciBvZiBkYXRhIHBvaW50cyBpbiB0aGUgbGluZXMuIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgY3JlYXRpbmcgW2EgY29ubmVjdGVkIHNjYXR0ZXJwbG90XShodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9leGFtcGxlcy9jb25uZWN0ZWRfc2NhdHRlcnBsb3QuaHRtbCkuXG4gICAqIC0gT3RoZXJ3aXNlLCB0aGlzIGBvcmRlcmAgY2hhbm5lbCBlbmNvZGVzIGxheWVyIG9yZGVyIG9mIHRoZSBtYXJrcy5cbiAgICpcbiAgICogX19Ob3RlX186IEluIGFnZ3JlZ2F0ZSBwbG90cywgYG9yZGVyYCBmaWVsZCBzaG91bGQgYmUgYGFnZ3JlZ2F0ZWBkIHRvIGF2b2lkIGNyZWF0aW5nIGFkZGl0aW9uYWwgYWdncmVnYXRpb24gZ3JvdXBpbmcuXG4gICAqL1xuICBvcmRlcj86IE9yZGVyRmllbGREZWY8Rj4gfCBPcmRlckZpZWxkRGVmPEY+W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5jb2RpbmdXaXRoRmFjZXQ8Rj4gZXh0ZW5kcyBFbmNvZGluZzxGPiwgRmFjZXRNYXBwaW5nPEY+IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFubmVsSGFzRmllbGQoZW5jb2Rpbmc6IEVuY29kaW5nV2l0aEZhY2V0PEZpZWxkPiwgY2hhbm5lbDogQ2hhbm5lbCk6IGJvb2xlYW4ge1xuICBjb25zdCBjaGFubmVsRGVmID0gZW5jb2RpbmcgJiYgZW5jb2RpbmdbY2hhbm5lbF07XG4gIGlmIChjaGFubmVsRGVmKSB7XG4gICAgaWYgKGlzQXJyYXkoY2hhbm5lbERlZikpIHtcbiAgICAgIHJldHVybiBzb21lKGNoYW5uZWxEZWYsIChmaWVsZERlZikgPT4gISFmaWVsZERlZi5maWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc0ZpZWxkRGVmKGNoYW5uZWxEZWYpIHx8IGhhc0NvbmRpdGlvbmFsRmllbGREZWYoY2hhbm5lbERlZik7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2dyZWdhdGUoZW5jb2Rpbmc6IEVuY29kaW5nV2l0aEZhY2V0PEZpZWxkPikge1xuICByZXR1cm4gc29tZShDSEFOTkVMUywgKGNoYW5uZWwpID0+IHtcbiAgICBpZiAoY2hhbm5lbEhhc0ZpZWxkKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgY29uc3QgY2hhbm5lbERlZiA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgICAgaWYgKGlzQXJyYXkoY2hhbm5lbERlZikpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoY2hhbm5lbERlZiwgKGZpZWxkRGVmKSA9PiAhIWZpZWxkRGVmLmFnZ3JlZ2F0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWVsZERlZiA9IGdldEZpZWxkRGVmKGNoYW5uZWxEZWYpO1xuICAgICAgICByZXR1cm4gZmllbGREZWYgJiYgISFmaWVsZERlZi5hZ2dyZWdhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVFbmNvZGluZyhlbmNvZGluZzogRW5jb2Rpbmc8c3RyaW5nPiwgbWFyazogTWFyayk6IEVuY29kaW5nPHN0cmluZz4ge1xuICAgcmV0dXJuIGtleXMoZW5jb2RpbmcpLnJlZHVjZSgobm9ybWFsaXplZEVuY29kaW5nOiBFbmNvZGluZzxzdHJpbmc+LCBjaGFubmVsOiBDaGFubmVsIHwgc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFpc0NoYW5uZWwoY2hhbm5lbCkpIHtcbiAgICAgIC8vIERyb3AgaW52YWxpZCBjaGFubmVsXG4gICAgICBsb2cud2Fybihsb2cubWVzc2FnZS5pbnZhbGlkRW5jb2RpbmdDaGFubmVsKGNoYW5uZWwpKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVkRW5jb2Rpbmc7XG4gICAgfVxuXG4gICAgaWYgKCFzdXBwb3J0TWFyayhjaGFubmVsLCBtYXJrKSkge1xuICAgICAgLy8gRHJvcCB1bnN1cHBvcnRlZCBjaGFubmVsXG5cbiAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLmluY29tcGF0aWJsZUNoYW5uZWwoY2hhbm5lbCwgbWFyaykpO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRFbmNvZGluZztcbiAgICB9XG5cbiAgICAvLyBEcm9wIGxpbmUncyBzaXplIGlmIHRoZSBmaWVsZCBpcyBhZ2dyZWdhdGVkLlxuICAgIGlmIChjaGFubmVsID09PSAnc2l6ZScgJiYgbWFyayA9PT0gJ2xpbmUnKSB7XG4gICAgICBjb25zdCBmaWVsZERlZiA9IGdldEZpZWxkRGVmKGVuY29kaW5nW2NoYW5uZWxdKTtcbiAgICAgIGlmIChmaWVsZERlZiAmJiBmaWVsZERlZi5hZ2dyZWdhdGUpIHtcbiAgICAgICAgbG9nLndhcm4obG9nLm1lc3NhZ2UuTElORV9XSVRIX1ZBUllJTkdfU0laRSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkRW5jb2Rpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRHJvcCBjb2xvciBpZiBlaXRoZXIgZmlsbCBvciBzdHJva2UgaXMgc3BlY2lmaWVkXG4gICAgIGlmIChjaGFubmVsID09PSAnY29sb3InICYmICgnZmlsbCcgaW4gZW5jb2RpbmcgfHwgJ3N0cm9rZScgaW4gZW5jb2RpbmcpICkge1xuICAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLmRyb3BwaW5nQ29sb3IoJ2VuY29kaW5nJywge2ZpbGw6ICdmaWxsJyBpbiBlbmNvZGluZywgc3Ryb2tlOiAnc3Ryb2tlJyBpbiBlbmNvZGluZ30pKTtcbiAgICAgICByZXR1cm4gbm9ybWFsaXplZEVuY29kaW5nO1xuICAgIH1cblxuICAgIGlmIChjaGFubmVsID09PSAnZGV0YWlsJyB8fCBjaGFubmVsID09PSAnb3JkZXInIHx8IChjaGFubmVsID09PSAndG9vbHRpcCcgJiYgaXNBcnJheShlbmNvZGluZ1tjaGFubmVsXSkpKSB7XG4gICAgICBjb25zdCBjaGFubmVsRGVmID0gZW5jb2RpbmdbY2hhbm5lbF07XG4gICAgICBpZiAoY2hhbm5lbERlZikge1xuICAgICAgICAvLyBBcnJheSBvZiBmaWVsZERlZnMgZm9yIGRldGFpbCBjaGFubmVsIChvciBwcm9kdWN0aW9uIHJ1bGUpXG4gICAgICAgIG5vcm1hbGl6ZWRFbmNvZGluZ1tjaGFubmVsXSA9IChpc0FycmF5KGNoYW5uZWxEZWYpID8gY2hhbm5lbERlZiA6IFtjaGFubmVsRGVmXSlcbiAgICAgICAgICAucmVkdWNlKChkZWZzOiBGaWVsZERlZjxzdHJpbmc+W10sIGZpZWxkRGVmOiBGaWVsZERlZjxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzRmllbGREZWYoZmllbGREZWYpKSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLmVtcHR5RmllbGREZWYoZmllbGREZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlZnMucHVzaChub3JtYWxpemVGaWVsZERlZihmaWVsZERlZiwgY2hhbm5lbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZnM7XG4gICAgICAgICAgfSwgW10pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGSVhNRTogcmVtb3ZlIHRoaXMgY2FzdGluZy4gIChJIGRvbid0IGtub3cgd2h5IFR5cGVzY3JpcHQgZG9lc24ndCBpbmZlciB0aGlzIGNvcnJlY3RseSBoZXJlLilcbiAgICAgIGNvbnN0IGNoYW5uZWxEZWYgPSBlbmNvZGluZ1tjaGFubmVsXSBhcyBDaGFubmVsRGVmPHN0cmluZz47XG5cbiAgICAgIGNvbnN0IGZpZWxkRGVmID0gZ2V0RmllbGREZWYoZW5jb2RpbmdbY2hhbm5lbF0pO1xuICAgICAgaWYgKGZpZWxkRGVmICYmIGNvbnRhaW5zKFtUeXBlLkxBVElUVURFLCBUeXBlLkxPTkdJVFVERV0sIGZpZWxkRGVmLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IHtbY2hhbm5lbF06IF8sIC4uLm5ld0VuY29kaW5nfSA9IG5vcm1hbGl6ZWRFbmNvZGluZztcbiAgICAgICAgY29uc3QgbmV3Q2hhbm5lbCA9IGNoYW5uZWwgPT09ICd4JyA/ICdsb25naXR1ZGUnIDpcbiAgICAgICAgICBjaGFubmVsID09PSAneScgPyAnbGF0aXR1ZGUnIDpcbiAgICAgICAgICBjaGFubmVsID09PSAneDInID8gJ2xvbmdpdHVkZTInIDpcbiAgICAgICAgICBjaGFubmVsID09PSAneTInID8gJ2xhdGl0dWRlMicgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLmxhdExvbmdEZXByZWNhdGVkKGNoYW5uZWwsIGZpZWxkRGVmLnR5cGUsIG5ld0NoYW5uZWwpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5uZXdFbmNvZGluZyxcbiAgICAgICAgICBbbmV3Q2hhbm5lbF06IHtcbiAgICAgICAgICAgIC4uLm5vcm1hbGl6ZShmaWVsZERlZiBhcyBhbnksIGNoYW5uZWwpLFxuICAgICAgICAgICAgdHlwZTogJ3F1YW50aXRhdGl2ZSdcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNGaWVsZERlZihjaGFubmVsRGVmKSAmJiAhaXNWYWx1ZURlZihjaGFubmVsRGVmKSAmJiAhaXNDb25kaXRpb25hbERlZihjaGFubmVsRGVmKSkge1xuICAgICAgICBsb2cud2Fybihsb2cubWVzc2FnZS5lbXB0eUZpZWxkRGVmKGNoYW5uZWxEZWYsIGNoYW5uZWwpKTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRFbmNvZGluZztcbiAgICAgIH1cbiAgICAgIG5vcm1hbGl6ZWRFbmNvZGluZ1tjaGFubmVsXSA9IG5vcm1hbGl6ZShjaGFubmVsRGVmLCBjaGFubmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRFbmNvZGluZztcbiAgfSwge30pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JhbmdlZChlbmNvZGluZzogRW5jb2RpbmdXaXRoRmFjZXQ8YW55Pikge1xuICByZXR1cm4gZW5jb2RpbmcgJiYgKCghIWVuY29kaW5nLnggJiYgISFlbmNvZGluZy54MikgfHwgKCEhZW5jb2RpbmcueSAmJiAhIWVuY29kaW5nLnkyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZERlZnMoZW5jb2Rpbmc6IEVuY29kaW5nV2l0aEZhY2V0PEZpZWxkPik6IEZpZWxkRGVmPEZpZWxkPltdIHtcbiAgY29uc3QgYXJyOiBGaWVsZERlZjxGaWVsZD5bXSA9IFtdO1xuICBDSEFOTkVMUy5mb3JFYWNoKGZ1bmN0aW9uKGNoYW5uZWwpIHtcbiAgICBpZiAoY2hhbm5lbEhhc0ZpZWxkKGVuY29kaW5nLCBjaGFubmVsKSkge1xuICAgICAgY29uc3QgY2hhbm5lbERlZiA9IGVuY29kaW5nW2NoYW5uZWxdO1xuICAgICAgKGlzQXJyYXkoY2hhbm5lbERlZikgPyBjaGFubmVsRGVmIDogW2NoYW5uZWxEZWZdKS5mb3JFYWNoKChkZWYpID0+IHtcbiAgICAgICAgaWYgKGlzRmllbGREZWYoZGVmKSkge1xuICAgICAgICAgIGFyci5wdXNoKGRlZik7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzQ29uZGl0aW9uYWxGaWVsZERlZihkZWYpKSB7XG4gICAgICAgICAgYXJyLnB1c2goZGVmLmNvbmRpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKG1hcHBpbmc6IGFueSxcbiAgICBmOiAoZmQ6IEZpZWxkRGVmPHN0cmluZz4sIGM6IENoYW5uZWwpID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSkge1xuICBpZiAoIW1hcHBpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKGNvbnN0IGNoYW5uZWwgb2Yga2V5cyhtYXBwaW5nKSkge1xuICAgIGlmIChpc0FycmF5KG1hcHBpbmdbY2hhbm5lbF0pKSB7XG4gICAgICBtYXBwaW5nW2NoYW5uZWxdLmZvckVhY2goZnVuY3Rpb24oY2hhbm5lbERlZjogQ2hhbm5lbERlZjxzdHJpbmc+KSB7XG4gICAgICAgIGYuY2FsbCh0aGlzQXJnLCBjaGFubmVsRGVmLCBjaGFubmVsKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmLmNhbGwodGhpc0FyZywgbWFwcGluZ1tjaGFubmVsXSwgY2hhbm5lbCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2U8VCwgVSBleHRlbmRzIHtbayBpbiBDaGFubmVsXT86IGFueX0+KG1hcHBpbmc6IFUsXG4gICAgZjogKGFjYzogYW55LCBmZDogRmllbGREZWY8c3RyaW5nPiwgYzogQ2hhbm5lbCkgPT4gVSxcbiAgICBpbml0OiBULCB0aGlzQXJnPzogYW55KSB7XG4gIGlmICghbWFwcGluZykge1xuICAgIHJldHVybiBpbml0O1xuICB9XG5cbiAgcmV0dXJuIGtleXMobWFwcGluZykucmVkdWNlKChyLCBjaGFubmVsKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbWFwcGluZ1tjaGFubmVsXTtcbiAgICBpZiAoaXNBcnJheShtYXApKSB7XG4gICAgICByZXR1cm4gbWFwLnJlZHVjZSgocjE6IFQsIGNoYW5uZWxEZWY6IENoYW5uZWxEZWY8c3RyaW5nPikgPT4ge1xuICAgICAgICByZXR1cm4gZi5jYWxsKHRoaXNBcmcsIHIxLCBjaGFubmVsRGVmLCBjaGFubmVsKTtcbiAgICAgIH0sIHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZi5jYWxsKHRoaXNBcmcsIHIsIG1hcCwgY2hhbm5lbCk7XG4gICAgfVxuICB9LCBpbml0KTtcbn1cbiJdfQ==