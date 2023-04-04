import styles from '@/styles/core/dataTable.module.css';
import { renderArguments } from '@/utils/registry/render-idl';

type ComponentProps = {
  data?: IdlAccountDef[];
};

export default function IDLAccountsTable({ data }: ComponentProps) {
  if (!data) <></>;
  return (
    <main className={`container-inner ${styles.scrollContainer} hide-scroll-bar`}>
      <table className={`${styles.dataTable} hide-scroll-bar font-mono`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <ul className={styles.dataList}>{renderArguments(item.type.fields)}</ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
