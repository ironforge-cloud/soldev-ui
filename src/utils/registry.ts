/*
    Minor helper functions for use in the Registry pages
*/

import { getIDLRecordByAddress } from "@/lib/queries";

export async function downloadIDL(address: string) {
  // fetch the IDL from the Ironforge API
  const record = await getIDLRecordByAddress(address);

  // convert the fetched idl data into
  const file = new Blob([JSON.stringify(record.idl, null, 2)], {
    type: "application/json",
  });

  // create a doc element to force the download of the json file
  const element = document.createElement("a");
  element.href = URL.createObjectURL(file);
  element.download = `${record.programName}.json`;
  document.body.appendChild(element);
  element.click();
}
