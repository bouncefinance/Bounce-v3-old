import classNames from "classnames";
import { FC } from "react";
import { uid } from "react-uid";

import { MaybeWithClassName } from "@app/helper/react/types";
import { Form } from "@app/modules/form";
import { Pagination } from "@app/modules/pagination";
import { PoolSearchField } from "@app/modules/pool-search-field";
import { Search } from "@app/modules/search";
import { SelectAuction } from "@app/modules/select-auction";
import { SelectTokenField } from "@app/modules/select-token-field";
import styles from "@app/pages/auction/Auction.module.scss";
import { Card, CardType } from "@app/pages/auction/ui/card";

import { Button } from "@app/ui/button";
import { GutterBox } from "@app/ui/gutter-box";

import { PopupTeleporterTarget } from "@app/ui/pop-up-container";
import { toDeltaTimer } from "@app/utils/time";

type AuctionType = {
	result?: CardType[];
	initialSearchState: any;
	numberOfPages: number;
	currentPage: number;
	onBack?(): void;
	onNext?(): void;
	onSubmit?(values: any): any;
};

export const AuctionView: FC<AuctionType & MaybeWithClassName> = ({
	className,
	result,
	onSubmit,
	numberOfPages,
	currentPage,
	onBack,
	onNext,
	initialSearchState,
}) => {
	return (
		<>
			<div className={classNames(className, styles.component)}>
				<Search
					className={classNames(styles.search, result === undefined && styles.fullscreen)}
					title="Find Auction"
					text="Fill in the fields optional below to easily find the auction that suits you"
					visibleText={result === undefined}
				>
					<Form className={styles.form} onSubmit={onSubmit} initialValues={initialSearchState}>
						<div>
							<SelectTokenField name="token-type" placeholder="Select a token" />
						</div>
						<div>
							<SelectAuction required name="auctionType" />
						</div>
						<div>
							<PoolSearchField placeholder="Pool Information (Optional)" name="pool" />
						</div>
						<Button
							className={styles.submit}
							size="large"
							color="ocean-blue"
							variant="contained"
							submit
						>
							Search
						</Button>
					</Form>
				</Search>
				{result && result.length > 0 && (
					<section className={styles.result}>
						<GutterBox>
							{result && (
								<>
									<ul className={styles.list}>
										{result.map((auction) => (
											<li key={uid(auction)} className={styles.item}>
												<Card
													href={auction.href}
													id={auction.id}
													status={auction.status}
													name={auction.name}
													address={auction.address}
													type={auction.type}
													tokenCurrency={auction.tokenCurrency}
													auctionAmount={auction.auctionAmount}
													auctionCurrency={auction.auctionCurrency}
													auctionPrice={auction.auctionPrice}
													fillInPercentage={auction.fillInPercentage}
												/>
												{toDeltaTimer((-auction.openTime + Date.now()) / 1000)}
											</li>
										))}
									</ul>
									{numberOfPages > 1 && (
										<Pagination
											className={styles.pagination}
											numberOfPages={numberOfPages}
											currentPage={currentPage}
											onBack={onBack}
											onNext={onNext}
										/>
									)}
								</>
							)}
						</GutterBox>
					</section>
				)}
			</div>
			<PopupTeleporterTarget />
		</>
	);
};
