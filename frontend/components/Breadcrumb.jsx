import { Children, Fragment, useContext } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { StateContext } from "../context/context";

const Breadcrumb = ({ children }) => {
  const state = useContext(StateContext);
  const childrenArray = Children.toArray(children);

  const getCustomerName = (customerId) => {
    if (state.customers) {
      const customer = state.customers.find(
        (customer) => customer._id === customerId
      );
      return customer?.firstname + " " + customer?.lastname;
    }
  };

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>
            <ChevronLeftIcon className="w-4" />
          </span>
        </Fragment>
      );
    }
    if (childrenArray[index - 1]?.props?.children == "לקוחות") {
      return {
        ...child,
        props: {
          ...child.props,
          children: getCustomerName(child.props.children),
        },
      };
    }

    return child;
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-4 font-sans font-semibold text-xl">
        {childrenWtihSeperator}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
