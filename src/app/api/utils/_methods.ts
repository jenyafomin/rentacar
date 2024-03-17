import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../back-end/db/mongodb/connection";

type TFuncMethodProps<T> = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<T>;

type TMethodFun<T, TT> = {
  execute: TFuncMethodProps<T>;
  dto?: TFuncMethodProps<TT>;
};

interface IhandleMethodsOptions<T> {
  GET?: TMethodFun<T, void | {code: number, message: string}>;
  POST?: TMethodFun<T, void | {code: number, message: string}>;
  PUT?: TMethodFun<T, void | {code: number, message: string}>;
  DELETE?: TMethodFun<T, void | {code: number, message: string}>;
}


export async function handleMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: IhandleMethodsOptions<any | void>,
  options: {useMongo?: boolean} = {}
) {
    if(options?.useMongo) {
        await dbConnect()
    }

  const status = await preCheckMethod(req, res, methods);

  if (status.code !== 1) {
    return res.status(status.code).json({message: status.message})
  }

//   console.log("EXECUTING METHOD", status)
  await executeMethod(req, res, methods);
}

export async function executeMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: IhandleMethodsOptions<any | void>
) {
    const method = req.method;
    
    if(methods[method]?.execute) {
        return await methods[method]?.execute(req, res)
    } else {
        return res.status(501).json({
            message: `Unknown method ${req.method} or method is not defined`,
        });
    }
}

export async function preCheckMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: IhandleMethodsOptions<undefined | {code: number, message: string}>
): Promise<{code: number, message: string}> {
  
    const method = req.method;
    
    if(methods[method]?.preCheck) {
        const result = await methods[method]?.dto(req, res)
        if(!result) return {code: 1, message: ""}
        return result
    } else {
        return {code: 1, message: ""}
    }
}
