"use strict";
// DateTime definition object
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var log = require("./log");
var util_1 = require("./util");
/*
 * A designated year that starts on Sunday.
 */
var SUNDAY_YEAR = 2006;
function isDateTime(o) {
    return !!o && (!!o.year || !!o.quarter || !!o.month || !!o.date || !!o.day ||
        !!o.hours || !!o.minutes || !!o.seconds || !!o.milliseconds);
}
exports.isDateTime = isDateTime;
exports.MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
exports.SHORT_MONTHS = exports.MONTHS.map(function (m) { return m.substr(0, 3); });
exports.DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
exports.SHORT_DAYS = exports.DAYS.map(function (d) { return d.substr(0, 3); });
function normalizeQuarter(q) {
    if (vega_util_1.isNumber(q)) {
        if (q > 4) {
            log.warn(log.message.invalidTimeUnit('quarter', q));
        }
        // We accept 1-based quarter, so need to readjust to 0-based quarter
        return (q - 1) + '';
    }
    else {
        // Invalid quarter
        throw new Error(log.message.invalidTimeUnit('quarter', q));
    }
}
function normalizeMonth(m) {
    if (vega_util_1.isNumber(m)) {
        // We accept 1-based month, so need to readjust to 0-based month
        return (m - 1) + '';
    }
    else {
        var lowerM = m.toLowerCase();
        var monthIndex = exports.MONTHS.indexOf(lowerM);
        if (monthIndex !== -1) {
            return monthIndex + ''; // 0 for january, ...
        }
        var shortM = lowerM.substr(0, 3);
        var shortMonthIndex = exports.SHORT_MONTHS.indexOf(shortM);
        if (shortMonthIndex !== -1) {
            return shortMonthIndex + '';
        }
        // Invalid month
        throw new Error(log.message.invalidTimeUnit('month', m));
    }
}
function normalizeDay(d) {
    if (vega_util_1.isNumber(d)) {
        // mod so that this can be both 0-based where 0 = sunday
        // and 1-based where 7=sunday
        return (d % 7) + '';
    }
    else {
        var lowerD = d.toLowerCase();
        var dayIndex = exports.DAYS.indexOf(lowerD);
        if (dayIndex !== -1) {
            return dayIndex + ''; // 0 for january, ...
        }
        var shortD = lowerD.substr(0, 3);
        var shortDayIndex = exports.SHORT_DAYS.indexOf(shortD);
        if (shortDayIndex !== -1) {
            return shortDayIndex + '';
        }
        // Invalid day
        throw new Error(log.message.invalidTimeUnit('day', d));
    }
}
/**
 * Return Vega Expression for a particular date time.
 * @param d
 * @param normalize whether to normalize quarter, month, day.
 */
function dateTimeExpr(d, normalize) {
    if (normalize === void 0) { normalize = false; }
    var units = [];
    if (normalize && d.day !== undefined) {
        if (util_1.keys(d).length > 1) {
            log.warn(log.message.droppedDay(d));
            d = util_1.duplicate(d);
            delete d.day;
        }
    }
    if (d.year !== undefined) {
        units.push(d.year);
    }
    else if (d.day !== undefined) {
        // Set year to 2006 for working with day since January 1 2006 is a Sunday
        units.push(SUNDAY_YEAR);
    }
    else {
        units.push(0);
    }
    if (d.month !== undefined) {
        var month = normalize ? normalizeMonth(d.month) : d.month;
        units.push(month);
    }
    else if (d.quarter !== undefined) {
        var quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
        units.push(quarter + '*3');
    }
    else {
        units.push(0); // months start at zero in JS
    }
    if (d.date !== undefined) {
        units.push(d.date);
    }
    else if (d.day !== undefined) {
        // HACK: Day only works as a standalone unit
        // This is only correct because we always set year to 2006 for day
        var day = normalize ? normalizeDay(d.day) : d.day;
        units.push(day + '+1');
    }
    else {
        units.push(1); // Date starts at 1 in JS
    }
    // Note: can't use TimeUnit enum here as importing it will create
    // circular dependency problem!
    for (var _i = 0, _a = ['hours', 'minutes', 'seconds', 'milliseconds']; _i < _a.length; _i++) {
        var timeUnit = _a[_i];
        if (d[timeUnit] !== undefined) {
            units.push(d[timeUnit]);
        }
        else {
            units.push(0);
        }
    }
    if (d.utc) {
        return "utc(" + units.join(', ') + ")";
    }
    else {
        return "datetime(" + units.join(', ') + ")";
    }
}
exports.dateTimeExpr = dateTimeExpr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0ZXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2Qjs7QUFFN0IsdUNBQW1DO0FBQ25DLDJCQUE2QjtBQUM3QiwrQkFBdUM7QUFHdkM7O0dBRUc7QUFDSCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7QUE4R3pCLG9CQUEyQixDQUFNO0lBQy9CLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRztRQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFIRCxnQ0FHQztBQUVZLFFBQUEsTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNwSSxRQUFBLFlBQVksR0FBRyxjQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUM7QUFFakQsUUFBQSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxF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LElBQUksQ0FBQyxNQUFHLENBQUM7S0FDbkM7U0FBTTtRQUNMLE9BQU8sY0FBWSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFHLENBQUM7S0FDeEM7QUFDSCxDQUFDO0FBeERELG9DQXdEQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERhdGVUaW1lIGRlZmluaXRpb24gb2JqZWN0XG5cbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJ3ZlZ2EtdXRpbCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHtkdXBsaWNhdGUsIGtleXN9IGZyb20gJy4vdXRpbCc7XG5cblxuLypcbiAqIEEgZGVzaWduYXRlZCB5ZWFyIHRoYXQgc3RhcnRzIG9uIFN1bmRheS5cbiAqL1xuY29uc3QgU1VOREFZX1lFQVIgPSAyMDA2O1xuXG4vKipcbiAqIEBtaW5pbXVtIDFcbiAqIEBtYXhpbXVtIDEyXG4gKiBAVEpTLXR5cGUgaW50ZWdlclxuICovXG5leHBvcnQgdHlwZSBNb250aCA9IG51bWJlcjtcblxuLyoqXG4gKiBAbWluaW11bSAxXG4gKiBAbWF4aW11bSA3XG4gKi9cbmV4cG9ydCB0eXBlIERheSA9IG51bWJlcjtcblxuLyoqXG4gKiBPYmplY3QgZm9yIGRlZmluaW5nIGRhdGV0aW1lIGluIFZlZ2EtTGl0ZSBGaWx0ZXIuXG4gKiBJZiBib3RoIG1vbnRoIGFuZCBxdWFydGVyIGFyZSBwcm92aWRlZCwgbW9udGggaGFzIGhpZ2hlciBwcmVjZWRlbmNlLlxuICogYGRheWAgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGggb3RoZXIgZGF0ZS5cbiAqIFdlIGFjY2VwdCBzdHJpbmcgZm9yIG1vbnRoIGFuZCBkYXkgbmFtZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWUge1xuICAvKipcbiAgICogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIHllYXIuXG4gICAqIEBUSlMtdHlwZSBpbnRlZ2VyXG4gICAqL1xuICB5ZWFyPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgcXVhcnRlciBvZiB0aGUgeWVhciAoZnJvbSAxLTQpLlxuICAgKiBAbWluaW11bSAxXG4gICAqIEBtYXhpbXVtIDRcbiAgICogQFRKUy10eXBlIGludGVnZXJcbiAgICovXG4gIHF1YXJ0ZXI/OiBudW1iZXI7XG5cbiAgLyoqIE9uZSBvZjogKDEpIGludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBtb250aCBmcm9tIGAxYC1gMTJgLiBgMWAgcmVwcmVzZW50cyBKYW51YXJ5OyAgKDIpIGNhc2UtaW5zZW5zaXRpdmUgbW9udGggbmFtZSAoZS5nLiwgYFwiSmFudWFyeVwiYCk7ICAoMykgY2FzZS1pbnNlbnNpdGl2ZSwgMy1jaGFyYWN0ZXIgc2hvcnQgbW9udGggbmFtZSAoZS5nLiwgYFwiSmFuXCJgKS4gKi9cbiAgbW9udGg/OiBNb250aCB8IHN0cmluZztcblxuICAvKipcbiAgICogSW50ZWdlciB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIGRhdGUgZnJvbSAxLTMxLlxuICAgKiBAbWluaW11bSAxXG4gICAqIEBtYXhpbXVtIDMxXG4gICAqIEBUSlMtdHlwZSBpbnRlZ2VyXG4gICAqL1xuICBkYXRlPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBWYWx1ZSByZXByZXNlbnRpbmcgdGhlIGRheSBvZiBhIHdlZWsuICBUaGlzIGNhbiBiZSBvbmUgb2Y6ICgxKSBpbnRlZ2VyIHZhbHVlIC0tIGAxYCByZXByZXNlbnRzIE1vbmRheTsgKDIpIGNhc2UtaW5zZW5zaXRpdmUgZGF5IG5hbWUgKGUuZy4sIGBcIk1vbmRheVwiYCk7ICAoMykgY2FzZS1pbnNlbnNpdGl2ZSwgMy1jaGFyYWN0ZXIgc2hvcnQgZGF5IG5hbWUgKGUuZy4sIGBcIk1vblwiYCkuICAgPGJyLz4gKipXYXJuaW5nOioqIEEgRGF0ZVRpbWUgZGVmaW5pdGlvbiBvYmplY3Qgd2l0aCBgZGF5YCoqIHNob3VsZCBub3QgYmUgY29tYmluZWQgd2l0aCBgeWVhcmAsIGBxdWFydGVyYCwgYG1vbnRoYCwgb3IgYGRhdGVgLlxuICAgKi9cbiAgZGF5PzogRGF5IHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgaG91ciBvZiBhIGRheSBmcm9tIDAtMjMuXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gMjNcbiAgICogQFRKUy10eXBlIGludGVnZXJcbiAgICovXG4gIGhvdXJzPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgbWludXRlIHNlZ21lbnQgb2YgdGltZSBmcm9tIDAtNTkuXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gNTlcbiAgICogQFRKUy10eXBlIGludGVnZXJcbiAgICovXG4gIG1pbnV0ZXM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBzZWNvbmQgc2VnbWVudCAoMC01OSkgb2YgYSB0aW1lIHZhbHVlXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gNTlcbiAgICogQFRKUy10eXBlIGludGVnZXJcbiAgICovXG4gIHNlY29uZHM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEludGVnZXIgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBtaWxsaXNlY29uZCBzZWdtZW50IG9mIHRpbWUuXG4gICAqIEBtaW5pbXVtIDBcbiAgICogQG1heGltdW0gOTk5XG4gICAqIEBUSlMtdHlwZSBpbnRlZ2VyXG4gICAqL1xuICBtaWxsaXNlY29uZHM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgYm9vbGVhbiBmbGFnIGluZGljYXRpbmcgaWYgZGF0ZSB0aW1lIGlzIGluIHV0YyB0aW1lLiBJZiBmYWxzZSwgdGhlIGRhdGUgdGltZSBpcyBpbiBsb2NhbCB0aW1lXG4gICAqL1xuICB1dGM/OiBib29sZWFuO1xufVxuXG5cbi8qKlxuICogSW50ZXJuYWwgT2JqZWN0IGZvciBkZWZpbmluZyBkYXRldGltZSBleHByZXNzaW9ucy5cbiAqIFRoaXMgaXMgYW4gZXhwcmVzc2lvbiB2ZXJzaW9uIG9mIERhdGVUaW1lLlxuICogSWYgYm90aCBtb250aCBhbmQgcXVhcnRlciBhcmUgcHJvdmlkZWQsIG1vbnRoIGhhcyBoaWdoZXIgcHJlY2VkZW5jZS5cbiAqIGBkYXlgIGNhbm5vdCBiZSBjb21iaW5lZCB3aXRoIG90aGVyIGRhdGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVRpbWVFeHByIHtcbiAgeWVhcj86IHN0cmluZztcbiAgcXVhcnRlcj86IHN0cmluZztcbiAgbW9udGg/OiBzdHJpbmc7XG4gIGRhdGU/OiBzdHJpbmc7XG4gIGRheT86IHN0cmluZztcbiAgaG91cnM/OiBzdHJpbmc7XG4gIG1pbnV0ZXM/OiBzdHJpbmc7XG4gIHNlY29uZHM/OiBzdHJpbmc7XG4gIG1pbGxpc2Vjb25kcz86IHN0cmluZztcbiAgdXRjPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZVRpbWUobzogYW55KTogbyBpcyBEYXRlVGltZSB7XG4gIHJldHVybiAhIW8gJiYgKCEhby55ZWFyIHx8ICEhby5xdWFydGVyIHx8ICEhby5tb250aCB8fCAhIW8uZGF0ZSB8fCAhIW8uZGF5IHx8XG4gICAgISFvLmhvdXJzIHx8ICEhby5taW51dGVzIHx8ICEhby5zZWNvbmRzIHx8ICEhby5taWxsaXNlY29uZHMpO1xufVxuXG5leHBvcnQgY29uc3QgTU9OVEhTID0gWydqYW51YXJ5JywgJ2ZlYnJ1YXJ5JywgJ21hcmNoJywgJ2FwcmlsJywgJ21heScsICdqdW5lJywgJ2p1bHknLCAnYXVndXN0JywgJ3NlcHRlbWJlcicsICdvY3RvYmVyJywgJ25vdmVtYmVyJywgJ2RlY2VtYmVyJ107XG5leHBvcnQgY29uc3QgU0hPUlRfTU9OVEhTID0gTU9OVEhTLm1hcCgobSkgPT4gbS5zdWJzdHIoMCwgMykpO1xuXG5leHBvcnQgY29uc3QgREFZUyA9IFsnc3VuZGF5JywgJ21vbmRheScsICd0dWVzZGF5JywgJ3dlZG5lc2RheScsICd0aHVyc2RheScsICdmcmlkYXknLCAnc2F0dXJkYXknXTtcbmV4cG9ydCBjb25zdCBTSE9SVF9EQVlTID0gREFZUy5tYXAoKGQpID0+IGQuc3Vic3RyKDAsMykpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVRdWFydGVyKHE6IG51bWJlciB8IHN0cmluZykge1xuICBpZiAoaXNOdW1iZXIocSkpIHtcbiAgICBpZiAocSA+IDQpIHtcbiAgICAgIGxvZy53YXJuKGxvZy5tZXNzYWdlLmludmFsaWRUaW1lVW5pdCgncXVhcnRlcicsIHEpKTtcbiAgICB9XG4gICAgLy8gV2UgYWNjZXB0IDEtYmFzZWQgcXVhcnRlciwgc28gbmVlZCB0byByZWFkanVzdCB0byAwLWJhc2VkIHF1YXJ0ZXJcbiAgICByZXR1cm4gKHEgLSAxKSArICcnO1xuICB9IGVsc2Uge1xuICAgIC8vIEludmFsaWQgcXVhcnRlclxuICAgIHRocm93IG5ldyBFcnJvcihsb2cubWVzc2FnZS5pbnZhbGlkVGltZVVuaXQoJ3F1YXJ0ZXInLCBxKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTW9udGgobTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gIGlmIChpc051bWJlcihtKSkge1xuICAgIC8vIFdlIGFjY2VwdCAxLWJhc2VkIG1vbnRoLCBzbyBuZWVkIHRvIHJlYWRqdXN0IHRvIDAtYmFzZWQgbW9udGhcbiAgICByZXR1cm4gKG0gLSAxKSArICcnO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGxvd2VyTSA9IG0udG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBtb250aEluZGV4ID0gTU9OVEhTLmluZGV4T2YobG93ZXJNKTtcbiAgICBpZiAobW9udGhJbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtb250aEluZGV4ICsgJyc7IC8vIDAgZm9yIGphbnVhcnksIC4uLlxuICAgIH1cbiAgICBjb25zdCBzaG9ydE0gPSBsb3dlck0uc3Vic3RyKDAsIDMpO1xuICAgIGNvbnN0IHNob3J0TW9udGhJbmRleCA9IFNIT1JUX01PTlRIUy5pbmRleE9mKHNob3J0TSk7XG4gICAgaWYgKHNob3J0TW9udGhJbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBzaG9ydE1vbnRoSW5kZXggKyAnJztcbiAgICB9XG4gICAgLy8gSW52YWxpZCBtb250aFxuICAgIHRocm93IG5ldyBFcnJvcihsb2cubWVzc2FnZS5pbnZhbGlkVGltZVVuaXQoJ21vbnRoJywgbSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURheShkOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgaWYgKGlzTnVtYmVyKGQpKSB7XG4gICAgLy8gbW9kIHNvIHRoYXQgdGhpcyBjYW4gYmUgYm90aCAwLWJhc2VkIHdoZXJlIDAgPSBzdW5kYXlcbiAgICAvLyBhbmQgMS1iYXNlZCB3aGVyZSA3PXN1bmRheVxuICAgIHJldHVybiAoZCAlIDcpICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbG93ZXJEID0gZC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGRheUluZGV4ID0gREFZUy5pbmRleE9mKGxvd2VyRCk7XG4gICAgaWYgKGRheUluZGV4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGRheUluZGV4ICsgJyc7IC8vIDAgZm9yIGphbnVhcnksIC4uLlxuICAgIH1cbiAgICBjb25zdCBzaG9ydEQgPSBsb3dlckQuc3Vic3RyKDAsIDMpO1xuICAgIGNvbnN0IHNob3J0RGF5SW5kZXggPSBTSE9SVF9EQVlTLmluZGV4T2Yoc2hvcnREKTtcbiAgICBpZiAoc2hvcnREYXlJbmRleCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBzaG9ydERheUluZGV4ICsgJyc7XG4gICAgfVxuICAgIC8vIEludmFsaWQgZGF5XG4gICAgdGhyb3cgbmV3IEVycm9yKGxvZy5tZXNzYWdlLmludmFsaWRUaW1lVW5pdCgnZGF5JywgZCkpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIFZlZ2EgRXhwcmVzc2lvbiBmb3IgYSBwYXJ0aWN1bGFyIGRhdGUgdGltZS5cbiAqIEBwYXJhbSBkXG4gKiBAcGFyYW0gbm9ybWFsaXplIHdoZXRoZXIgdG8gbm9ybWFsaXplIHF1YXJ0ZXIsIG1vbnRoLCBkYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRlVGltZUV4cHIoZDogRGF0ZVRpbWUgfCBEYXRlVGltZUV4cHIsIG5vcm1hbGl6ZSA9IGZhbHNlKSB7XG4gIGNvbnN0IHVuaXRzOiAoc3RyaW5nIHwgbnVtYmVyKVtdID0gW107XG5cbiAgaWYgKG5vcm1hbGl6ZSAmJiBkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGtleXMoZCkubGVuZ3RoID4gMSkge1xuICAgICAgbG9nLndhcm4obG9nLm1lc3NhZ2UuZHJvcHBlZERheShkKSk7XG4gICAgICBkID0gZHVwbGljYXRlKGQpO1xuICAgICAgZGVsZXRlIGQuZGF5O1xuICAgIH1cbiAgfVxuXG4gIGlmIChkLnllYXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHVuaXRzLnB1c2goZC55ZWFyKTtcbiAgfSBlbHNlIGlmIChkLmRheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gU2V0IHllYXIgdG8gMjAwNiBmb3Igd29ya2luZyB3aXRoIGRheSBzaW5jZSBKYW51YXJ5IDEgMjAwNiBpcyBhIFN1bmRheVxuICAgIHVuaXRzLnB1c2goU1VOREFZX1lFQVIpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7XG4gIH1cblxuICBpZiAoZC5tb250aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbW9udGggPSBub3JtYWxpemUgPyBub3JtYWxpemVNb250aChkLm1vbnRoKSA6IGQubW9udGg7XG4gICAgdW5pdHMucHVzaChtb250aCk7XG4gIH0gZWxzZSBpZiAoZC5xdWFydGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBxdWFydGVyID0gbm9ybWFsaXplID8gbm9ybWFsaXplUXVhcnRlcihkLnF1YXJ0ZXIpIDogZC5xdWFydGVyO1xuICAgIHVuaXRzLnB1c2gocXVhcnRlciArICcqMycpO1xuICB9IGVsc2Uge1xuICAgIHVuaXRzLnB1c2goMCk7IC8vIG1vbnRocyBzdGFydCBhdCB6ZXJvIGluIEpTXG4gIH1cblxuICBpZiAoZC5kYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1bml0cy5wdXNoKGQuZGF0ZSk7XG4gIH0gZWxzZSBpZiAoZC5kYXkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEhBQ0s6IERheSBvbmx5IHdvcmtzIGFzIGEgc3RhbmRhbG9uZSB1bml0XG4gICAgLy8gVGhpcyBpcyBvbmx5IGNvcnJlY3QgYmVjYXVzZSB3ZSBhbHdheXMgc2V0IHllYXIgdG8gMjAwNiBmb3IgZGF5XG4gICAgY29uc3QgZGF5ID0gbm9ybWFsaXplID8gbm9ybWFsaXplRGF5KGQuZGF5KSA6IGQuZGF5O1xuICAgIHVuaXRzLnB1c2goZGF5ICsgJysxJyk7XG4gIH0gZWxzZSB7XG4gICAgdW5pdHMucHVzaCgxKTsgLy8gRGF0ZSBzdGFydHMgYXQgMSBpbiBKU1xuICB9XG5cbiAgLy8gTm90ZTogY2FuJ3QgdXNlIFRpbWVVbml0IGVudW0gaGVyZSBhcyBpbXBvcnRpbmcgaXQgd2lsbCBjcmVhdGVcbiAgLy8gY2lyY3VsYXIgZGVwZW5kZW5jeSBwcm9ibGVtIVxuICBmb3IgKGNvbnN0IHRpbWVVbml0IG9mIFsnaG91cnMnLCAnbWludXRlcycsICdzZWNvbmRzJywgJ21pbGxpc2Vjb25kcyddKSB7XG4gICAgaWYgKGRbdGltZVVuaXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVuaXRzLnB1c2goZFt0aW1lVW5pdF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0cy5wdXNoKDApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkLnV0Yykge1xuICAgIHJldHVybiBgdXRjKCR7dW5pdHMuam9pbignLCAnKX0pYDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYGRhdGV0aW1lKCR7dW5pdHMuam9pbignLCAnKX0pYDtcbiAgfVxufVxuIl19