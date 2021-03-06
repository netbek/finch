"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var channel_1 = require("../../channel");
var encoding_1 = require("../../encoding");
var fielddef_1 = require("../../fielddef");
var type_1 = require("../../type");
var common_1 = require("../common");
var mixins = require("./mixins");
var ref = require("./valueref");
exports.text = {
    vgMark: 'text',
    encodeEntry: function (model) {
        var config = model.config, encoding = model.encoding, height = model.height, markDef = model.markDef;
        var textDef = encoding.text;
        return tslib_1.__assign({}, mixins.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), mixins.pointPosition('x', model, xDefault(config, textDef)), mixins.pointPosition('y', model, ref.mid(height)), mixins.text(model), mixins.nonPosition('size', model, tslib_1.__assign({}, (markDef.size ? { defaultValue: markDef.size } : {}), { vgChannel: 'fontSize' // VL's text size is fontSize
         })), mixins.valueIfDefined('align', align(model.markDef, encoding, config)));
    }
};
function xDefault(config, textDef) {
    if (fielddef_1.isFieldDef(textDef) && textDef.type === type_1.QUANTITATIVE) {
        return { field: { group: 'width' }, offset: -5 };
    }
    // TODO: allow this to fit (Be consistent with ref.midX())
    return { value: config.scale.textXRangeStep / 2 };
}
function align(markDef, encoding, config) {
    var a = markDef.align || common_1.getMarkConfig('align', markDef, config);
    if (a === undefined) {
        return encoding_1.channelHasField(encoding, channel_1.X) || encoding_1.channelHasField(encoding, channel_1.LONGITUDE) ? 'center' : 'right';
    }
    // If there is a config, Vega-parser will process this already.
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21waWxlL21hcmsvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBMkM7QUFFM0MsMkNBQXlEO0FBQ3pELDJDQUFzRDtBQUV0RCxtQ0FBd0M7QUFFeEMsb0NBQXdDO0FBR3hDLGlDQUFtQztBQUNuQyxnQ0FBa0M7QUFHckIsUUFBQSxJQUFJLEdBQWlCO0lBQ2hDLE1BQU0sRUFBRSxNQUFNO0lBRWQsV0FBVyxFQUFFLFVBQUMsS0FBZ0I7UUFDckIsSUFBQSxxQkFBTSxFQUFFLHlCQUFRLEVBQUUscUJBQU0sRUFBRSx1QkFBTyxDQUFVO1FBQ2xELElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFOUIsNEJBQ0ssTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUNqRSxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNsQixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLHVCQUM5QixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQ3JELFNBQVMsRUFBRSxVQUFVLENBQUUsNkJBQTZCO1lBQ3BELEVBQ0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3pFO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBa0IsTUFBYyxFQUFFLE9BQTJCO0lBQzNELElBQUkscUJBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLG1CQUFZLEVBQUU7UUFDeEQsT0FBTyxFQUFDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztLQUM5QztJQUNELDBEQUEwRDtJQUMxRCxPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUMsRUFBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxlQUFlLE9BQWdCLEVBQUUsUUFBMEIsRUFBRSxNQUFjO0lBQ3pFLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksc0JBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNuQixPQUFPLDBCQUFlLENBQUMsUUFBUSxFQUFFLFdBQUMsQ0FBQyxJQUFJLDBCQUFlLENBQUMsUUFBUSxFQUFFLG1CQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDbEc7SUFDRCwrREFBK0Q7SUFDL0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TE9OR0lUVURFLCBYfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtjaGFubmVsSGFzRmllbGQsIEVuY29kaW5nfSBmcm9tICcuLi8uLi9lbmNvZGluZyc7XG5pbXBvcnQge0NoYW5uZWxEZWYsIGlzRmllbGREZWZ9IGZyb20gJy4uLy4uL2ZpZWxkZGVmJztcbmltcG9ydCB7TWFya0RlZn0gZnJvbSAnLi4vLi4vbWFyayc7XG5pbXBvcnQge1FVQU5USVRBVElWRX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge1ZnVmFsdWVSZWZ9IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7Z2V0TWFya0NvbmZpZ30gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLi91bml0JztcbmltcG9ydCB7TWFya0NvbXBpbGVyfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0ICogYXMgbWl4aW5zIGZyb20gJy4vbWl4aW5zJztcbmltcG9ydCAqIGFzIHJlZiBmcm9tICcuL3ZhbHVlcmVmJztcblxuXG5leHBvcnQgY29uc3QgdGV4dDogTWFya0NvbXBpbGVyID0ge1xuICB2Z01hcms6ICd0ZXh0JyxcblxuICBlbmNvZGVFbnRyeTogKG1vZGVsOiBVbml0TW9kZWwpID0+IHtcbiAgICBjb25zdCB7Y29uZmlnLCBlbmNvZGluZywgaGVpZ2h0LCBtYXJrRGVmfSA9IG1vZGVsO1xuICAgIGNvbnN0IHRleHREZWYgPSBlbmNvZGluZy50ZXh0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1peGlucy5iYXNlRW5jb2RlRW50cnkobW9kZWwsIHtzaXplOiAnaWdub3JlJywgb3JpZW50OiAnaWdub3JlJ30pLFxuICAgICAgLi4ubWl4aW5zLnBvaW50UG9zaXRpb24oJ3gnLCBtb2RlbCwgeERlZmF1bHQoY29uZmlnLCB0ZXh0RGVmKSksXG4gICAgICAuLi5taXhpbnMucG9pbnRQb3NpdGlvbigneScsIG1vZGVsLCByZWYubWlkKGhlaWdodCkpLFxuICAgICAgLi4ubWl4aW5zLnRleHQobW9kZWwpLFxuICAgICAgLi4ubWl4aW5zLm5vblBvc2l0aW9uKCdzaXplJywgbW9kZWwsIHtcbiAgICAgICAgLi4uKG1hcmtEZWYuc2l6ZSA/IHtkZWZhdWx0VmFsdWU6IG1hcmtEZWYuc2l6ZX0gOiB7fSksXG4gICAgICAgIHZnQ2hhbm5lbDogJ2ZvbnRTaXplJyAgLy8gVkwncyB0ZXh0IHNpemUgaXMgZm9udFNpemVcbiAgICAgIH0pLFxuICAgICAgLi4ubWl4aW5zLnZhbHVlSWZEZWZpbmVkKCdhbGlnbicsIGFsaWduKG1vZGVsLm1hcmtEZWYsIGVuY29kaW5nLCBjb25maWcpKVxuICAgIH07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHhEZWZhdWx0KGNvbmZpZzogQ29uZmlnLCB0ZXh0RGVmOiBDaGFubmVsRGVmPHN0cmluZz4pOiBWZ1ZhbHVlUmVmIHtcbiAgaWYgKGlzRmllbGREZWYodGV4dERlZikgJiYgdGV4dERlZi50eXBlID09PSBRVUFOVElUQVRJVkUpIHtcbiAgICByZXR1cm4ge2ZpZWxkOiB7Z3JvdXA6ICd3aWR0aCd9LCBvZmZzZXQ6IC01fTtcbiAgfVxuICAvLyBUT0RPOiBhbGxvdyB0aGlzIHRvIGZpdCAoQmUgY29uc2lzdGVudCB3aXRoIHJlZi5taWRYKCkpXG4gIHJldHVybiB7dmFsdWU6IGNvbmZpZy5zY2FsZS50ZXh0WFJhbmdlU3RlcCAvIDJ9O1xufVxuXG5mdW5jdGlvbiBhbGlnbihtYXJrRGVmOiBNYXJrRGVmLCBlbmNvZGluZzogRW5jb2Rpbmc8c3RyaW5nPiwgY29uZmlnOiBDb25maWcpIHtcbiAgY29uc3QgYSA9IG1hcmtEZWYuYWxpZ24gfHwgZ2V0TWFya0NvbmZpZygnYWxpZ24nLCBtYXJrRGVmLCBjb25maWcpO1xuICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNoYW5uZWxIYXNGaWVsZChlbmNvZGluZywgWCkgfHwgY2hhbm5lbEhhc0ZpZWxkKGVuY29kaW5nLCBMT05HSVRVREUpID8gJ2NlbnRlcicgOiAncmlnaHQnO1xuICB9XG4gIC8vIElmIHRoZXJlIGlzIGEgY29uZmlnLCBWZWdhLXBhcnNlciB3aWxsIHByb2Nlc3MgdGhpcyBhbHJlYWR5LlxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIl19