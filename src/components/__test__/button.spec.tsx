import React from "react";
import { render } from "../../test-utils";
import {Button} from "../button";


describe("<button />", ()=>{
    it("Should render ok whith props", ()=>{
        const {getByText} = render(<Button canClick={true}  loading={false}
            actionText={"test"}
            />);
        getByText("test");
      
    })
    it("Should display loading", ()=>{
        const {getByText, container} = render(<Button canClick={false}  loading={true}
            actionText={"test"}
            />);
        getByText("Loading...");
        expect(container.firstChild).toHaveClass("pointer-events-none");

    })
})