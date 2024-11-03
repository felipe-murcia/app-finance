export interface IFinance {
    objectId: string;
    name: string;
	concept: "INCOME" | "EXPENSE" | "SALVING";
	amount: number;
	month: number;
	year: number;
}