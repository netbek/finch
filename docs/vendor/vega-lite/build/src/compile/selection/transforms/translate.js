"use strict";
/// <reference path="../../../../typings/vega-event-selector.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var vega_event_selector_1 = require("vega-event-selector");
var channel_1 = require("../../../channel");
var interval_1 = require("../interval");
var selection_1 = require("../selection");
var scales_1 = require("./scales");
var ANCHOR = '_translate_anchor';
var DELTA = '_translate_delta';
var translate = {
    has: function (selCmpt) {
        return selCmpt.type === 'interval' && selCmpt.translate;
    },
    signals: function (model, selCmpt, signals) {
        var name = selCmpt.name;
        var hasScales = scales_1.default.has(selCmpt);
        var anchor = name + ANCHOR;
        var _a = selection_1.positionalProjections(selCmpt), x = _a.x, y = _a.y;
        var events = vega_event_selector_1.selector(selCmpt.translate, 'scope');
        if (!hasScales) {
            events = events.map(function (e) { return (e.between[0].markname = name + interval_1.BRUSH, e); });
        }
        signals.push({
            name: anchor,
            value: {},
            on: [{
                    events: events.map(function (e) { return e.between[0]; }),
                    update: '{x: x(unit), y: y(unit)' +
                        (x !== null ? ', extent_x: ' + (hasScales ? scales_1.domain(model, channel_1.X) :
                            "slice(" + selection_1.channelSignalName(selCmpt, 'x', 'visual') + ")") : '') +
                        (y !== null ? ', extent_y: ' + (hasScales ? scales_1.domain(model, channel_1.Y) :
                            "slice(" + selection_1.channelSignalName(selCmpt, 'y', 'visual') + ")") : '') + '}'
                }]
        }, {
            name: name + DELTA,
            value: {},
            on: [{
                    events: events,
                    update: "{x: " + anchor + ".x - x(unit), y: " + anchor + ".y - y(unit)}"
                }]
        });
        if (x !== null) {
            onDelta(model, selCmpt, channel_1.X, 'width', signals);
        }
        if (y !== null) {
            onDelta(model, selCmpt, channel_1.Y, 'height', signals);
        }
        return signals;
    }
};
exports.default = translate;
function onDelta(model, selCmpt, channel, size, signals) {
    var name = selCmpt.name;
    var hasScales = scales_1.default.has(selCmpt);
    var signal = signals.filter(function (s) {
        return s.name === selection_1.channelSignalName(selCmpt, channel, hasScales ? 'data' : 'visual');
    })[0];
    var anchor = name + ANCHOR;
    var delta = name + DELTA;
    var sizeSg = model.getSizeSignalRef(size).signal;
    var scaleCmpt = model.getScaleComponent(channel);
    var scaleType = scaleCmpt.get('type');
    var sign = hasScales && channel === channel_1.X ? '-' : ''; // Invert delta when panning x-scales.
    var extent = anchor + ".extent_" + channel;
    var offset = "" + sign + delta + "." + channel + " / " + (hasScales ? "" + sizeSg : "span(" + extent + ")");
    var panFn = !hasScales ? 'panLinear' :
        scaleType === 'log' ? 'panLog' :
            scaleType === 'pow' ? 'panPow' : 'panLinear';
    var update = panFn + "(" + extent + ", " + offset +
        (hasScales && scaleType === 'pow' ? ", " + (scaleCmpt.get('exponent') || 1) : '') + ')';
    signal.on.push({
        events: { signal: delta },
        update: hasScales ? update : "clampRange(" + update + ", 0, " + sizeSg + ")"
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvc2VsZWN0aW9uL3RyYW5zZm9ybXMvdHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxRUFBcUU7O0FBRXJFLDJEQUE4RDtBQUU5RCw0Q0FBb0Q7QUFFcEQsd0NBQW9EO0FBQ3BELDBDQUEwRjtBQUUxRixtQ0FBZ0Q7QUFJaEQsSUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDbkMsSUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUM7QUFFakMsSUFBTSxTQUFTLEdBQXFCO0lBQ2xDLEdBQUcsRUFBRSxVQUFTLE9BQU87UUFDbkIsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzFELENBQUM7SUFFRCxPQUFPLEVBQUUsVUFBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87UUFDdkMsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFNLFNBQVMsR0FBRyxnQkFBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUEsK0NBQXVDLEVBQXRDLFFBQUMsRUFBRSxRQUFDLENBQW1DO1FBQzlDLElBQUksTUFBTSxHQUFHLDhCQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxnQkFBYyxFQUFFLENBQUMsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUM7U0FDaEY7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LEVBQUUsQ0FBQyxDQUFDLHNDQUFzQztJQUMxRixJQUFNLE1BQU0sR0FBTSxNQUFNLGdCQUFXLE9BQVMsQ0FBQztJQUM3QyxJQUFNLE1BQU0sR0FBRyxLQUFHLElBQUksR0FBRyxLQUFLLFNBQUksT0FBTyxRQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUcsTUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFRLE1BQU0sTUFBRyxDQUFDLENBQUM7SUFDL0YsSUFBTSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQy9DLElBQU0sTUFBTSxHQUFNLEtBQUssU0FBSSxNQUFNLFVBQUssTUFBUTtRQUM1QyxDQUFDLFNBQVMsSUFBSSxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUV4RixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7UUFDdkIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBYyxNQUFNLGFBQVEsTUFBTSxNQUFHO0tBQ25FLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy92ZWdhLWV2ZW50LXNlbGVjdG9yLmQudHNcIiAvPlxuXG5pbXBvcnQge3NlbGVjdG9yIGFzIHBhcnNlU2VsZWN0b3J9IGZyb20gJ3ZlZ2EtZXZlbnQtc2VsZWN0b3InO1xuXG5pbXBvcnQge1NjYWxlQ2hhbm5lbCwgWCwgWX0gZnJvbSAnLi4vLi4vLi4vY2hhbm5lbCc7XG5pbXBvcnQge1ZnU2lnbmFsfSBmcm9tICcuLi8uLi8uLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge0JSVVNIIGFzIElOVEVSVkFMX0JSVVNIfSBmcm9tICcuLi9pbnRlcnZhbCc7XG5pbXBvcnQge2NoYW5uZWxTaWduYWxOYW1lLCBwb3NpdGlvbmFsUHJvamVjdGlvbnMsIFNlbGVjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vc2VsZWN0aW9uJztcbmltcG9ydCB7VW5pdE1vZGVsfSBmcm9tICcuLy4uLy4uL3VuaXQnO1xuaW1wb3J0IHNjYWxlc0NvbXBpbGVyLCB7ZG9tYWlufSBmcm9tICcuL3NjYWxlcyc7XG5pbXBvcnQge1RyYW5zZm9ybUNvbXBpbGVyfSBmcm9tICcuL3RyYW5zZm9ybXMnO1xuXG5cbmNvbnN0IEFOQ0hPUiA9ICdfdHJhbnNsYXRlX2FuY2hvcic7XG5jb25zdCBERUxUQSA9ICdfdHJhbnNsYXRlX2RlbHRhJztcblxuY29uc3QgdHJhbnNsYXRlOlRyYW5zZm9ybUNvbXBpbGVyID0ge1xuICBoYXM6IGZ1bmN0aW9uKHNlbENtcHQpIHtcbiAgICByZXR1cm4gc2VsQ21wdC50eXBlID09PSAnaW50ZXJ2YWwnICYmIHNlbENtcHQudHJhbnNsYXRlO1xuICB9LFxuXG4gIHNpZ25hbHM6IGZ1bmN0aW9uKG1vZGVsLCBzZWxDbXB0LCBzaWduYWxzKSB7XG4gICAgY29uc3QgbmFtZSA9IHNlbENtcHQubmFtZTtcbiAgICBjb25zdCBoYXNTY2FsZXMgPSBzY2FsZXNDb21waWxlci5oYXMoc2VsQ21wdCk7XG4gICAgY29uc3QgYW5jaG9yID0gbmFtZSArIEFOQ0hPUjtcbiAgICBjb25zdCB7eCwgeX0gPSBwb3NpdGlvbmFsUHJvamVjdGlvbnMoc2VsQ21wdCk7XG4gICAgbGV0IGV2ZW50cyA9IHBhcnNlU2VsZWN0b3Ioc2VsQ21wdC50cmFuc2xhdGUsICdzY29wZScpO1xuXG4gICAgaWYgKCFoYXNTY2FsZXMpIHtcbiAgICAgIGV2ZW50cyA9IGV2ZW50cy5tYXAoKGUpID0+IChlLmJldHdlZW5bMF0ubWFya25hbWUgPSBuYW1lICsgSU5URVJWQUxfQlJVU0gsIGUpKTtcbiAgICB9XG5cbiAgICBzaWduYWxzLnB1c2goe1xuICAgICAgbmFtZTogYW5jaG9yLFxuICAgICAgdmFsdWU6IHt9LFxuICAgICAgb246IFt7XG4gICAgICAgIGV2ZW50czogZXZlbnRzLm1hcCgoZSkgPT4gZS5iZXR3ZWVuWzBdKSxcbiAgICAgICAgdXBkYXRlOiAne3g6IHgodW5pdCksIHk6IHkodW5pdCknICtcbiAgICAgICAgICAoeCAhPT0gbnVsbCA/ICcsIGV4dGVudF94OiAnICsgKGhhc1NjYWxlcyA/IGRvbWFpbihtb2RlbCwgWCkgOlxuICAgICAgICAgICAgICBgc2xpY2UoJHtjaGFubmVsU2lnbmFsTmFtZShzZWxDbXB0LCAneCcsICd2aXN1YWwnKX0pYCkgOiAnJykgK1xuXG4gICAgICAgICAgKHkgIT09IG51bGwgPyAnLCBleHRlbnRfeTogJyArIChoYXNTY2FsZXMgPyBkb21haW4obW9kZWwsIFkpIDpcbiAgICAgICAgICAgICAgYHNsaWNlKCR7Y2hhbm5lbFNpZ25hbE5hbWUoc2VsQ21wdCwgJ3knLCAndmlzdWFsJyl9KWApIDogJycpICsgJ30nXG4gICAgICB9XVxuICAgIH0sIHtcbiAgICAgIG5hbWU6IG5hbWUgKyBERUxUQSxcbiAgICAgIHZhbHVlOiB7fSxcbiAgICAgIG9uOiBbe1xuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgdXBkYXRlOiBge3g6ICR7YW5jaG9yfS54IC0geCh1bml0KSwgeTogJHthbmNob3J9LnkgLSB5KHVuaXQpfWBcbiAgICAgIH1dXG4gICAgfSk7XG5cbiAgICBpZiAoeCAhPT0gbnVsbCkge1xuICAgICAgb25EZWx0YShtb2RlbCwgc2VsQ21wdCwgWCwgJ3dpZHRoJywgc2lnbmFscyk7XG4gICAgfVxuXG4gICAgaWYgKHkgIT09IG51bGwpIHtcbiAgICAgIG9uRGVsdGEobW9kZWwsIHNlbENtcHQsIFksICdoZWlnaHQnLCBzaWduYWxzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2lnbmFscztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlO1xuXG5mdW5jdGlvbiBvbkRlbHRhKG1vZGVsOiBVbml0TW9kZWwsIHNlbENtcHQ6IFNlbGVjdGlvbkNvbXBvbmVudCwgY2hhbm5lbDogU2NhbGVDaGFubmVsLCBzaXplOiAnd2lkdGgnIHwgJ2hlaWdodCcsIHNpZ25hbHM6IFZnU2lnbmFsW10pIHtcbiAgY29uc3QgbmFtZSA9IHNlbENtcHQubmFtZTtcbiAgY29uc3QgaGFzU2NhbGVzID0gc2NhbGVzQ29tcGlsZXIuaGFzKHNlbENtcHQpO1xuICBjb25zdCBzaWduYWwgPSBzaWduYWxzLmZpbHRlcihzID0+IHtcbiAgICByZXR1cm4gcy5uYW1lID09PSBjaGFubmVsU2lnbmFsTmFtZShzZWxDbXB0LCBjaGFubmVsLCBoYXNTY2FsZXMgPyAnZGF0YScgOiAndmlzdWFsJyk7XG4gIH0pWzBdO1xuICBjb25zdCBhbmNob3IgPSBuYW1lICsgQU5DSE9SO1xuICBjb25zdCBkZWx0YSA9IG5hbWUgKyBERUxUQTtcbiAgY29uc3Qgc2l6ZVNnID0gbW9kZWwuZ2V0U2l6ZVNpZ25hbFJlZihzaXplKS5zaWduYWw7XG4gIGNvbnN0IHNjYWxlQ21wdCA9IG1vZGVsLmdldFNjYWxlQ29tcG9uZW50KGNoYW5uZWwpO1xuICBjb25zdCBzY2FsZVR5cGUgPSBzY2FsZUNtcHQuZ2V0KCd0eXBlJyk7XG4gIGNvbnN0IHNpZ24gPSBoYXNTY2FsZXMgJiYgY2hhbm5lbCA9PT0gWCA/ICctJyA6ICcnOyAvLyBJbnZlcnQgZGVsdGEgd2hlbiBwYW5uaW5nIHgtc2NhbGVzLlxuICBjb25zdCBleHRlbnQgPSBgJHthbmNob3J9LmV4dGVudF8ke2NoYW5uZWx9YDtcbiAgY29uc3Qgb2Zmc2V0ID0gYCR7c2lnbn0ke2RlbHRhfS4ke2NoYW5uZWx9IC8gYCArIChoYXNTY2FsZXMgPyBgJHtzaXplU2d9YCA6IGBzcGFuKCR7ZXh0ZW50fSlgKTtcbiAgY29uc3QgcGFuRm4gPSAhaGFzU2NhbGVzID8gJ3BhbkxpbmVhcicgOlxuICAgIHNjYWxlVHlwZSA9PT0gJ2xvZycgPyAncGFuTG9nJyA6XG4gICAgc2NhbGVUeXBlID09PSAncG93JyA/ICdwYW5Qb3cnIDogJ3BhbkxpbmVhcic7XG4gIGNvbnN0IHVwZGF0ZSA9IGAke3BhbkZufSgke2V4dGVudH0sICR7b2Zmc2V0fWAgK1xuICAgIChoYXNTY2FsZXMgJiYgc2NhbGVUeXBlID09PSAncG93JyA/IGAsICR7c2NhbGVDbXB0LmdldCgnZXhwb25lbnQnKSB8fCAxfWAgOiAnJykgKyAnKSc7XG5cbiAgc2lnbmFsLm9uLnB1c2goe1xuICAgIGV2ZW50czoge3NpZ25hbDogZGVsdGF9LFxuICAgIHVwZGF0ZTogaGFzU2NhbGVzID8gdXBkYXRlIDogYGNsYW1wUmFuZ2UoJHt1cGRhdGV9LCAwLCAke3NpemVTZ30pYFxuICB9KTtcbn1cbiJdfQ==