import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  KontoEarlierPayments,
  KontoList,
  KontoNextPayment,
  KontoSaldo,
  PaymentItem,
} from "@/components/Konto";

export default function Konto() {
  return (
    <div className="">
      <Header></Header>
      <KontoList>
        <div className="grid grid-cols-[1fr_2fr] gap-2.5">
          <KontoSaldo saldo="1.800"></KontoSaldo>
          <KontoNextPayment ammount="180" date="01/12-26"></KontoNextPayment>
        </div>
        <KontoEarlierPayments>
          <PaymentItem title="Flyslæb 19/8" ammount="157,50"></PaymentItem>
          <PaymentItem title="Flyslæb 19/8" ammount="157,50"></PaymentItem>
          <PaymentItem title="Flyslæb 19/8" ammount="157,50"></PaymentItem>
          <PaymentItem title="Flyslæb 19/8" ammount="157,50"></PaymentItem>
        </KontoEarlierPayments>
      </KontoList>
      <Navbar></Navbar>
    </div>
  );
}
