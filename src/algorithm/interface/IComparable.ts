export default interface IComparable<T> {
    equals(other: T): boolean;
}