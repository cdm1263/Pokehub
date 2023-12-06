import styles from './cards.module.scss';

const CardEditor = () => {
  return (
    <div className={styles.editor_wrapper}>
      <div>
        <span className={styles.title}>몬스터 이름</span>
        <ul className={styles.pokemon_name_editor}>
          <li>
            <span className={styles.list_name}>별칭 1</span>
            <div>
              <span>전설의</span>
              <button className={styles.border_button}>랜덤</button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}>별칭 2</span>
            <div>
              <span>화가난</span>
              <button className={styles.border_button}>랜덤</button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}> 이름</span>
            <div></div>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <span className={styles.title}>스테이터스</span>
          <ul>
            <li>체력</li>
            <li>공격</li>
            <li>방어</li>
            <li>특수공격</li>
            <li>특수방어</li>
            <li>스피드</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
