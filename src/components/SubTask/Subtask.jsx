import css from './SubTask.module.css';

function Subtasks() {
  return (
    <div>
      <ul className={css.subtasks}>
        <li className={css.subtask}>Subtask 1</li>
        <li className={css.subtask}>Subtask 2</li>
        <li className={css.subtask}>Subtask 3</li>
      </ul>
      <button className={css.addButton}>add subtask</button>
    </div>
  );
}

export default Subtasks;
