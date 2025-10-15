import React, { useState } from "react";

import { ApiPromise } from "@polkadot/api";

import { ClimateData } from "../types";

interface Props {
    api: ApiPromise | null;
    account: any;
    onDataSubmit: (data: ClimateData) => void;




}

