import React from "react";
import Navbar, {Nav} from "../../nav/Navbar";
import MenuContent from "./MenuContent";
import Logo from "../../logo/Logo";
import { menuContent } from "@/configs/(ecom)/menu";


export default function EremiaMenu ({hamburger}: {hamburger: boolean}) {

    let $key = 0;
    const getSubMenu = (items) => {
        $key++;
        if (items.dropdownMenu) {
            return (<Nav.Dropdown name={items.name}
                                  key={$key}>{items.dropdownMenu.map(item => getSubMenu(item))}</Nav.Dropdown>);
        }
        return (
            <Nav.Link href={items.href} key={$key}>{items.name}</Nav.Link>
        );
    }


    return (
        <Navbar hamburger={hamburger}>
            <Navbar.Brand href={"/"} transitionPage={{title: "Eremia"}}>
                {/* <Logo width="75px" height="auto"/> */}
            </Navbar.Brand>

            <Navbar.Collapse cover="Menu">
                <Nav>
                    {menuContent.map(item => getSubMenu(item))}
                </Nav>
                <MenuContent className="section-margin"/>
            </Navbar.Collapse>
        </Navbar>
    );

}