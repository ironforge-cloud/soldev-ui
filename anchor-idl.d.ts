/*
    Anchor IDL type definitions (for use within the registry pages)
    
    NOTE: these types were taken from the anchor lang repo, and may be modified slightly for simplicity
    Repo here: https://github.com/coral-xyz/anchor/blob/master/ts/packages/anchor/src/idl.ts
*/

// NOTE: imports left in and commented for reference of the original type
// import { Buffer } from "buffer";
// import { PublicKey } from "@solana/web3.js";

type Idl = {
  version: string;
  name: string;
  docs?: string[];
  instructions: IdlInstruction[];
  accounts?: IdlAccountDef[];
  types?: IdlTypeDef[];
  events?: IdlEvent[];
  errors?: IdlErrorCode[];
  constants?: IdlConstant[];
  metadata?: IdlMetadata;
};

type IdlMetadata = any;

type IdlConstant = {
  name: string;
  type: IdlType;
  value: string;
};

type IdlEvent = {
  name: string;
  fields: IdlEventField[];
};

type IdlEventField = {
  name: string;
  type: IdlType;
  index: boolean;
};

type IdlInstruction = {
  name: string;
  docs?: string[];
  accounts: IdlAccountItem[];
  args: IdlField[];
  returns?: IdlType;
};

type IdlStateMethod = IdlInstruction;

type IdlAccountItem = IdlAccount | IdlAccounts;

type IdlAccount = {
  name: string;
  isMut: boolean;
  isSigner: boolean;
  isOptional?: boolean;
  docs?: string[];
  relations?: string[];
  pda?: IdlPda;
};

type IdlPda = {
  seeds: IdlSeed[];
  programId?: IdlSeed;
};

type IdlSeed = any; // TODO

// A nested/recursive version of IdlAccount.
type IdlAccounts = {
  name: string;
  docs?: string[];
  accounts: IdlAccountItem[];
};

type IdlField = {
  name: string;
  docs?: string[];
  type: IdlType;
};

type IdlTypeDef = {
  name: string;
  docs?: string[];
  type: IdlTypeDefTy;
};

type IdlAccountDef = {
  name: string;
  docs?: string[];
  type: IdlTypeDefTyStruct;
};

type IdlTypeDefTyStruct = {
  kind: "struct";
  fields: IdlTypeDefStruct;
};

type IdlTypeDefTyEnum = {
  kind: "enum";
  variants: IdlEnumVariant[];
};

type IdlTypeDefTy = IdlTypeDefTyEnum | IdlTypeDefTyStruct;

type IdlTypeDefStruct = Array<IdlField>;

type IdlType =
  | "bool"
  | "u8"
  | "i8"
  | "u16"
  | "i16"
  | "u32"
  | "i32"
  | "f32"
  | "u64"
  | "i64"
  | "f64"
  | "u128"
  | "i128"
  | "u256"
  | "i256"
  | "bytes"
  | "string"
  | "publicKey"
  | IdlTypeDefined
  | IdlTypeOption
  | IdlTypeCOption
  | IdlTypeVec
  | IdlTypeArray;

// User defined type.
type IdlTypeDefined = {
  defined: string;
};

type IdlTypeOption = {
  option: IdlType;
};

type IdlTypeCOption = {
  coption: IdlType;
};

type IdlTypeVec = {
  vec: IdlType;
};

type IdlTypeArray = {
  array: [idlType: IdlType, size: number];
};

type IdlEnumVariant = {
  name: string;
  fields?: IdlEnumFields;
};

type IdlEnumFields = IdlEnumFieldsNamed | IdlEnumFieldsTuple;

type IdlEnumFieldsNamed = IdlField[];

type IdlEnumFieldsTuple = IdlType[];

type IdlErrorCode = {
  code: number;
  name: string;
  msg?: string;
};

// The on-chain account of the IDL.
interface IdlProgramAccount {
  authority: PublicKey;
  data: Buffer;
}
