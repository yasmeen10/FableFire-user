import { useLocation } from "react-router-dom";
import ArrowSVG from "./SVG/ArrowSVG";

export default function Stepper() {
  const location = useLocation();
  const steps = [
    { stepName: "Shopping Cart", pathName: "/cart" },
    { stepName: "Checkout", pathName: "/checkout" },
    { stepName: "Payment", pathName: "/payment" },
    { stepName: "Confirmation", pathName: "/orderconfirmation" },
  ];
  return (
    <div className=" mt-32">
      <ul className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li key={index} className="flex">
            <span
              className={`text-sm ${
                step.pathName === location.pathname
                  ? "text-textcolor2"
                  : "text-placeholder"
              } `}
            >
              {step.stepName}
            </span>
            {index !== steps.length - 1 && (
              <ArrowSVG
                color={
                  step.pathName === location.pathname
                    ? "text-textcolor2"
                    : "text-placeholder"
                }
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
