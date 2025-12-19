export type Range<N extends number, Result extends number[] = []> = Result["length"] extends N
  ? Result[number] | N
  : Range<N, [...Result, Result["length"]]>;

// 生成 1~N
export type Range1ToN<N extends number> = Exclude<Range<N>, 0>;
