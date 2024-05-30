export default function PaymentDetails() {
  return (
    <div>
      <div className="shippingDetails border border-landing rounded-lg">
        <div className="border-b border-b-landing">
          <h1 className="my-2 ml-6 text-sm">Shipping Details</h1>
        </div>
        <div className="my-2 mx-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Yasmeen Walid</span>
            <span className="text-sm font-medium">yasmeen@gmail.com</span>
          </div>
          <span className="block text-sm font-medium">Egypt</span>
          <span className="block text-sm font-medium">Ismailia</span>
          <span className="block text-sm font-medium">111 20 ismailia</span>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-base">Choose payment method</h1>
        <div className="border border-landing rounded-lg px-9 py-4 mt-2">
          <ul className="marker:text-landing list-disc">
            <li>
              <span className="block text-sm font-medium">Cash</span>
            </li>
            <li>
              <span className="block text-sm font-medium">VISA</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
