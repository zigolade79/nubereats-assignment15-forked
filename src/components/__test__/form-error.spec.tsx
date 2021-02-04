import React from "react";
import { render } from "../../test-utils";
import { FormError } from "../form-error";


describe("<FormError />", ()=>{
    it("Should render ok whith props", ()=>{
        const {debug, getByText} = render(<FormError errorMessage={"test"}  />);
        getByText("test");
      
    })
})