import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import type { NextPage } from "next";

import { AuthenticationContext } from "../../services/authentication.context";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import DebitCard from "../../components/DepitCard";
import TransactionListItem from "../../components/TransactionListItem";
import BalanceChart from "../../components/BalanceChart";
import AddFundsModal from "../../components/AddFundsModal";

import { formatCurrency } from "../../assets/formatCurrency";

const Dashboard: NextPage = () => {
  const { userData } = useContext(AuthenticationContext);
  const [isAddBalanceModalActive, setIsAddBalanceModalActive] =
    useState<boolean>(false);

  const router = useRouter();

  //   useEffect(() => {
  //     console.log(router);
  //   }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Bank</title>
      </Head>
      {isAddBalanceModalActive && (
        <AddFundsModal
          setIsAddBalanceModalActive={setIsAddBalanceModalActive}
        />
      )}
      <div className="w-page-width px-20 py-24 overflow-y-auto">
        <div className="flex 2xl:flex-row lg:flex-col mb-10">
          <div className="mw-1/2 bg-gray-200 rounded-2xl p-7">
            <h2 className="text-white font-bold text-2xl w-full mb-10">
              Cards
            </h2>
            {userData && (
              <DebitCard
                first_name={userData.first_name}
                last_name={userData.last_name}
                card_number={userData.card_number}
              />
            )}
            <div className="w-full flex justify-between items-center">
              <div>
                <h3 className="text-light-gray font-medium text-lg w-full">
                  Balance
                </h3>
                <span className="text-white font-md text-4xl w-full">
                  {userData && formatCurrency(userData.balance)}
                </span>
              </div>
              <AddCircleIcon
                onClick={() => setIsAddBalanceModalActive(true)}
                className="text-purple-light cursor-pointer"
                style={{ fontSize: "3rem" }}
              />
            </div>
          </div>
          <div className="mw-1/2 bg-gray-200 rounded-2xl p-7 ml-10 w-full">
            <h2 className="text-white font-bold text-2xl w-full mb-10">
              Last Transactions
            </h2>
            <div>
              <TransactionListItem />
              <TransactionListItem />
              <TransactionListItem />
              <TransactionListItem />
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-2xl p-8">
          <h2 className="text-white font-bold text-2xl w-full ">
            Balance History
          </h2>
          <BalanceChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
