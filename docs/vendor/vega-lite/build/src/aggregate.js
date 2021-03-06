"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vega_util_1 = require("vega-util");
var util_1 = require("./util");
var AGGREGATE_OP_INDEX = {
    argmax: 1,
    argmin: 1,
    average: 1,
    count: 1,
    distinct: 1,
    max: 1,
    mean: 1,
    median: 1,
    min: 1,
    missing: 1,
    q1: 1,
    q3: 1,
    ci0: 1,
    ci1: 1,
    stderr: 1,
    stdev: 1,
    stdevp: 1,
    sum: 1,
    valid: 1,
    values: 1,
    variance: 1,
    variancep: 1,
};
exports.AGGREGATE_OPS = util_1.flagKeys(AGGREGATE_OP_INDEX);
function isAggregateOp(a) {
    return !!AGGREGATE_OP_INDEX[a];
}
exports.isAggregateOp = isAggregateOp;
exports.COUNTING_OPS = ['count', 'valid', 'missing', 'distinct'];
function isCountingAggregateOp(aggregate) {
    return aggregate && util_1.contains(exports.COUNTING_OPS, aggregate);
}
exports.isCountingAggregateOp = isCountingAggregateOp;
/** Additive-based aggregation operations.  These can be applied to stack. */
exports.SUM_OPS = [
    'count',
    'sum',
    'distinct',
    'valid',
    'missing'
];
/**
 * Aggregation operators that always produce values within the range [domainMin, domainMax].
 */
exports.SHARED_DOMAIN_OPS = [
    'mean',
    'average',
    'median',
    'q1',
    'q3',
    'min',
    'max',
];
exports.SHARED_DOMAIN_OP_INDEX = vega_util_1.toSet(exports.SHARED_DOMAIN_OPS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FnZ3JlZ2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFnQztBQUNoQywrQkFBZ0Q7QUFFaEQsSUFBTSxrQkFBa0IsR0FBc0I7SUFDNUMsTUFBTSxFQUFFLENBQUM7SUFDVCxNQUFNLEVBQUUsQ0FBQztJQUNULE9BQU8sRUFBRSxDQUFDO0lBQ1YsS0FBSyxFQUFFLENBQUM7SUFDUixRQUFRLEVBQUUsQ0FBQztJQUNYLEdBQUcsRUFBRSxDQUFDO0lBQ04sSUFBSSxFQUFFLENBQUM7SUFDUCxNQUFNLEVBQUUsQ0FBQztJQUNULEdBQUcsRUFBRSxDQUFDO0lBQ04sT0FBTyxFQUFFLENBQUM7SUFDVixFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0lBQ0wsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLE1BQU0sRUFBRSxDQUFDO0lBQ1QsS0FBSyxFQUFFLENBQUM7SUFDUixNQUFNLEVBQUUsQ0FBQztJQUNULEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLENBQUM7SUFDUixNQUFNLEVBQUUsQ0FBQztJQUNULFFBQVEsRUFBRSxDQUFDO0lBQ1gsU0FBUyxFQUFFLENBQUM7Q0FDYixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQUcsZUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFMUQsdUJBQThCLENBQVM7SUFDckMsT0FBTyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELHNDQUVDO0FBRVksUUFBQSxZQUFZLEdBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFckYsK0JBQXNDLFNBQWlCO0lBQ3JELE9BQU8sU0FBUyxJQUFJLGVBQVEsQ0FBQyxvQkFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGRCxzREFFQztBQUVELDZFQUE2RTtBQUNoRSxRQUFBLE9BQU8sR0FBa0I7SUFDbEMsT0FBTztJQUNQLEtBQUs7SUFDTCxVQUFVO0lBQ1YsT0FBTztJQUNQLFNBQVM7Q0FDWixDQUFDO0FBRUY7O0dBRUc7QUFDVSxRQUFBLGlCQUFpQixHQUFrQjtJQUM1QyxNQUFNO0lBQ04sU0FBUztJQUNULFFBQVE7SUFDUixJQUFJO0lBQ0osSUFBSTtJQUNKLEtBQUs7SUFDTCxLQUFLO0NBQ1IsQ0FBQztBQUVXLFFBQUEsc0JBQXNCLEdBQUcsaUJBQUssQ0FBQyx5QkFBaUIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZ2dyZWdhdGVPcH0gZnJvbSAndmVnYSc7XG5pbXBvcnQge3RvU2V0fSBmcm9tICd2ZWdhLXV0aWwnO1xuaW1wb3J0IHtjb250YWlucywgRmxhZywgZmxhZ0tleXN9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IEFHR1JFR0FURV9PUF9JTkRFWDogRmxhZzxBZ2dyZWdhdGVPcD4gPSB7XG4gIGFyZ21heDogMSxcbiAgYXJnbWluOiAxLFxuICBhdmVyYWdlOiAxLFxuICBjb3VudDogMSxcbiAgZGlzdGluY3Q6IDEsXG4gIG1heDogMSxcbiAgbWVhbjogMSxcbiAgbWVkaWFuOiAxLFxuICBtaW46IDEsXG4gIG1pc3Npbmc6IDEsXG4gIHExOiAxLFxuICBxMzogMSxcbiAgY2kwOiAxLFxuICBjaTE6IDEsXG4gIHN0ZGVycjogMSxcbiAgc3RkZXY6IDEsXG4gIHN0ZGV2cDogMSxcbiAgc3VtOiAxLFxuICB2YWxpZDogMSxcbiAgdmFsdWVzOiAxLFxuICB2YXJpYW5jZTogMSxcbiAgdmFyaWFuY2VwOiAxLFxufTtcblxuZXhwb3J0IGNvbnN0IEFHR1JFR0FURV9PUFMgPSBmbGFnS2V5cyhBR0dSRUdBVEVfT1BfSU5ERVgpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2dyZWdhdGVPcChhOiBzdHJpbmcpOiBhIGlzIEFnZ3JlZ2F0ZU9wIHtcbiAgcmV0dXJuICEhQUdHUkVHQVRFX09QX0lOREVYW2FdO1xufVxuXG5leHBvcnQgY29uc3QgQ09VTlRJTkdfT1BTOiBBZ2dyZWdhdGVPcFtdID0gWydjb3VudCcsICd2YWxpZCcsICdtaXNzaW5nJywgJ2Rpc3RpbmN0J107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvdW50aW5nQWdncmVnYXRlT3AoYWdncmVnYXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGFnZ3JlZ2F0ZSAmJiBjb250YWlucyhDT1VOVElOR19PUFMsIGFnZ3JlZ2F0ZSk7XG59XG5cbi8qKiBBZGRpdGl2ZS1iYXNlZCBhZ2dyZWdhdGlvbiBvcGVyYXRpb25zLiAgVGhlc2UgY2FuIGJlIGFwcGxpZWQgdG8gc3RhY2suICovXG5leHBvcnQgY29uc3QgU1VNX09QUzogQWdncmVnYXRlT3BbXSA9IFtcbiAgICAnY291bnQnLFxuICAgICdzdW0nLFxuICAgICdkaXN0aW5jdCcsXG4gICAgJ3ZhbGlkJyxcbiAgICAnbWlzc2luZydcbl07XG5cbi8qKlxuICogQWdncmVnYXRpb24gb3BlcmF0b3JzIHRoYXQgYWx3YXlzIHByb2R1Y2UgdmFsdWVzIHdpdGhpbiB0aGUgcmFuZ2UgW2RvbWFpbk1pbiwgZG9tYWluTWF4XS5cbiAqL1xuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BTOiBBZ2dyZWdhdGVPcFtdID0gW1xuICAgICdtZWFuJyxcbiAgICAnYXZlcmFnZScsXG4gICAgJ21lZGlhbicsXG4gICAgJ3ExJyxcbiAgICAncTMnLFxuICAgICdtaW4nLFxuICAgICdtYXgnLFxuXTtcblxuZXhwb3J0IGNvbnN0IFNIQVJFRF9ET01BSU5fT1BfSU5ERVggPSB0b1NldChTSEFSRURfRE9NQUlOX09QUyk7XG4iXX0=