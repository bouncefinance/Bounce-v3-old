import { fetchLbpHistory } from '@app/api/lbp/api'
import { ILBPDetail, ILBPHistory } from '@app/api/lbp/types'
import { Pagination } from '@app/modules/pagination'
import { Body1, Caption } from '@app/ui/typography'
import { roundedDivide } from '@app/utils/bn'
import { fromWei } from '@app/utils/bn/wei'
import { useChainId } from '@app/web3/hooks/use-web3'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import moment from 'moment'
import path from 'path'
import React, { useEffect, useState } from 'react'
import { uid } from 'react-uid'
import { getActivity } from '../account/utils'
import styles from './ExtensionInfo.module.scss'

const WINDOW_SIZE = 10;
export interface IAuctionHistoryViewProps {
    poolAddress: string;
    detailData: ILBPDetail;
}

export const AuctionHistoryView = ({poolAddress, detailData} : IAuctionHistoryViewProps) => {
    const [page, setPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState<number>(0)
    const chainId = useChainId();
    const [historyList, setHistoryList] = useState<ILBPHistory[]>([])

    useEffect(() => {
        (async () => {
            const {
                data: historyData,
                meta: {total}
            } = await fetchLbpHistory(chainId, poolAddress, {page: page, perPage: WINDOW_SIZE})
            setHistoryList(historyData);
            setNumberOfPages(Math.ceil(total / WINDOW_SIZE))
        })();
        
    }, [chainId, page, poolAddress])


    return (
        <div className={styles.activityInfo}>
            {historyList && historyList.length > 0 && (
                <div>
                    <div className={styles.head}>
                        <Caption className={styles.cell} Component="span" weight="bold" lighten={50}>
                            Time
                        </Caption>
                        <Caption className={styles.cell} Component="span" weight="bold" lighten={50}>
                            Type
                        </Caption>
                        <Caption className={styles.cell} Component="span" weight="bold" lighten={50}>
                            Amount
                        </Caption>
                        <Caption className={styles.cell} Component="span" weight="bold" lighten={50}>
                            {`${detailData?.token0Symbol} Price`}
                        </Caption>
                        <Caption className={styles.cell} Component="span" weight="bold" lighten={50}>
                            Wallet
                        </Caption>
                    </div>
                    <ul className={styles.body}>
                        {historyList.map((activity) => (
                            <li key={uid(activity)} className={styles.row}>
                                <Body1
                                    className={styles.cell}
                                    Component="span"
                                >
                                    {moment(Number(activity.blockTs) * 1000).format('MMM DD,YYYY HH:mm')}
                                </Body1>
                                <Body1
                                    className={styles.cell}
                                    Component="span"
                                >
                                    {getActivity(activity.type, activity.tokenInSymbol)}
                                </Body1>
                                <Body1 Component="div" className={styles.amount}>
									<Body1 Component="span">
										<span>{`${fromWei(activity.tokenInAmount, activity?.tokenInDecimals)} ${activity.tokenInSymbol}`}</span>
									</Body1>
									<Body1 Component="span">
										<Body1 className={styles.cellAmount} Component="span">
                                        <span>{`${fromWei(activity.tokenOutAmount, activity?.tokenOutDecimals)} ${activity.tokenOutSymbol}`}</span>&nbsp;
											<span className={styles.cellAmount}>(${Number(activity.tokenOutVolume)?.toFixed(2)})</span>
										</Body1>
									</Body1>
								</Body1>
                                <Body1
                                    className={styles.cell}
                                    Component="span"
                                >
                                    ${roundedDivide(activity?.tokenInVolume, fromWei(activity?.tokenInAmount, activity?.tokenInDecimals).toString(), 2)}
                                </Body1>
                                <Body1
                                    className={styles.cell}
                                    Component="span"
                                >
                                    {activity.requestor?.slice(0, 6)}...{activity.requestor?.slice(-4)}
                                </Body1>
                            </li>
                        ))}
                    </ul>
                    {numberOfPages > 1 && (
						<Pagination
							className={styles.pagination}
							numberOfPages={numberOfPages}
							currentPage={page}
							onBack={() => setPage(page - 1)}
							onNext={() => setPage(page + 1)}
						/>
					)}
                </div>
            )}
        </div>
    )
}
