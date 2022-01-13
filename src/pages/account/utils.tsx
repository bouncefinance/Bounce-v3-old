export const getActivity = (type: number, token?: string) => {
	switch (type) {
		case 1:
			return "Fixed Swap Auction";
		case 2:
			return "Sell OTC";
		case 3:
			return "Buy OTC";
		case 4:
			return "Token Launch Auctions";
		case 5:
			return token ? `Buy ${token}` : "Buy LBPs";
		case 6:
			return token ? `Sell ${token}` :  "Sell LBPs";
		default:
			return "Unknown";

	}
};

export type EventType = "Claimed" | "UserClaimed" | "Created" | "Swapped";

enum EVENT {
	CREATED = "Created",
	CLAIMED = "Claim",
	BID = "Bid",
	BUY = "Buy",
	SELL = "Sell",
}

export const getEvent = (event: EventType, business, auction) => {
	if (event === "Claimed" || event === "UserClaimed") {
		return EVENT.CLAIMED;
	}

	if (event === "Created") {
		return EVENT.CREATED;
	}

	if (event === "Swapped") {
		if (business === 2) {
			return EVENT.BID;
		} else {
			if (auction === 0) {
				return EVENT.BUY;
			} else return EVENT.SELL;
		}
	}
};
