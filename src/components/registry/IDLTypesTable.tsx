import styles from '@/styles/core/dataTable.module.css';
import badge from '@/styles/core/badge.module.css';
import { renderArguments } from '@/utils/registry/render-idl';

type ComponentProps = {
  data?: IdlTypeDef[];
};

export default function IDLTypesTable({ data }: ComponentProps) {
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
              <td>
                <div className="inline-flex space-x-1">
                  <span className={badge.bold}>{item.type.kind}</span>
                  <span>{item.name}</span>
                </div>
              </td>
              <td>
                <ul className={styles.dataList}>
                  {renderArguments(
                    (item.type as IdlTypeDefTyStruct)?.fields ||
                      (item.type as IdlTypeDefTyEnum)?.variants
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
