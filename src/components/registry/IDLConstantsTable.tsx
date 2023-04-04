import styles from '@/styles/core/dataTable.module.css';
import badge from '@/styles/core/badge.module.css';

type ComponentProps = {
  data?: IdlConstant[];
};

export default function IDLConstantsTable({ data }: ComponentProps) {
  if (!data) <></>;
  return (
    <main className={`container-inner ${styles.scrollContainer} hide-scroll-bar`}>
      <table className={`${styles.dataTable} hide-scroll-bar font-mono`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <span className={badge.default}>{(item.type as IdlType).toString()}</span>
              </td>
              <td>
                <span className={badge.default}>{item.value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
