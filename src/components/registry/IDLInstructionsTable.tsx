import styles from "@/styles/core/dataTable.module.css";
import { renderAccounts, renderArguments } from "@/utils/registry/render-idl";

type ComponentProps = {
  data: IdlInstruction[];
};

export default function IDLInstructionsTable({ data }: ComponentProps) {
  return (
    <main
      className={`container-inner ${styles.scrollContainer} hide-scroll-bar`}
    >
      <table className={`${styles.dataTable} font-mono hide-scroll-bar`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Arguments</th>
            <th>Accounts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <ul className={styles.dataList}>
                  {renderArguments(item.args)}
                </ul>
              </td>
              <td>
                <ul className={styles.dataList}>
                  {renderAccounts(item.accounts)}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
