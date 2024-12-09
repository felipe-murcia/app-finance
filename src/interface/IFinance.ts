export interface IFinance {
    objectId: string;
    name: string;
	concept: "INCOME" | "EXPENSE" | "SAVING";
	amount: number;
	month: number;
	year: number;
}