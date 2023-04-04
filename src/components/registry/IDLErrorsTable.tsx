import styles from '@/styles/core/dataTable.module.css';

type ComponentProps = {
  data?: IdlErrorCode[];
};

export default function IDLErrorsTable({ data }: ComponentProps) {
  if (!data) <></>;
  return (
    <main className={`container-inner ${styles.scrollContainer} hide-scroll-bar`}>
      <table className={`${styles.dataTable} hide-scroll-bar font-mono`}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.msg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
