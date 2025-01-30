"use client"
import React from 'react'

import Service from "../Service";
import {getServiceData} from "../../../../configs/(ecom)/service";


export default function ServiceOne ({className}: {className?: string}) {
    const serviceData = getServiceData()
    return (
        <Service.grid col={3} colTablet={2} colMobile={1}  colGap={15} masonry
             className={className} data={serviceData} backgroundColor={"background-section"} styleBox={"line"}
        />
    );
};