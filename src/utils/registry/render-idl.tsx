import badge from '@/styles/core/badge.module.css';

/*
    Parse and render the `accounts` of an Anchor IDL
*/
export function renderAccounts(accounts: IdlAccountItem[]) {
  let components: React.ReactNode[] = [];

  for (let i = 0; i < accounts.length; i++) {
    components.push(
      <li key={accounts[i].name}>
        <span>{accounts[i].name}</span>

        {(accounts[i] as IdlAccount)?.isSigner && <span className={badge.red}>isSigner</span>}
        {(accounts[i] as IdlAccount)?.isMut && <span className={badge.green}>isMut</span>}
      </li>
    );
  }

  return components;
}

/*
    Parse and render the arguments (aka `args`) of an Anchor IDL
*/
export function renderArguments(args: any[]) {
  let components: React.ReactNode[] = [];

  for (let i = 0; i < args?.length; i++) {
    let type = '';

    // string constants
    if (typeof args[i].type === 'string') type = args[i].type.toString();
    // IdlTypeArray
    else if ((args[i].type as IdlTypeArray)?.array) {
      type = `[${(args[i].type as IdlTypeArray).array[0]}; ${
        (args[i].type as IdlTypeArray).array[1]
      }]`;
    }
    // IdlTypeVec
    else if ((args[i].type as IdlTypeVec)?.vec) {
      // coerce into `any` for type checking
      const vec: any = args[i].type;

      // IdlTypeDefined
      if (vec?.['defined']) {
        type = `Vec<${vec.defined}>`;
      }
      // IdlTypeArray
      else if (vec?.array) {
        type = `Vec<[${vec?.array[0]}; ${vec?.array[1]}]>`;
      }
      // final catch all (normally string constants)
      else {
        type = `Vec<${(args[i].type as IdlTypeVec).vec}>`;
      }
    }
    // IdlTypeDefined
    else if ((args[i].type as IdlTypeDefined)?.defined) {
      type = (args[i].type as IdlTypeDefined).defined;
    }
    // IdlTypeOption
    else if ((args[i].type as IdlTypeOption)?.option) {
      type = `Option<${(args[i].type as IdlTypeOption).option}>`;
    }
    // IdlTypeCOption
    else if ((args[i].type as IdlTypeCOption)?.coption) {
      type = `COption<${(args[i].type as IdlTypeCOption).coption}>`;
    }
    // final catch all (normally string constants)
    else type = args[i].type?.toString() || args[i].type;

    // add the current argument into the returnable array
    components.push(
      <li key={args[i].name}>
        <span>{args[i].name}</span>
        <span className={badge.default}>{type}</span>
      </li>
    );
  }

  return components;
}
