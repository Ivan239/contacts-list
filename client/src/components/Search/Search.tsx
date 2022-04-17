import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Search.module.sass';

type SearchProps = {
  setSearchValue: (searchValue: string) => void;
};

function Search({ setSearchValue }: SearchProps) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: { [x: string]: string }): void => {
    setSearchValue(data.Search);
  };
  return (
    <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Ivan Ivanov"
        className={styles.field}
        id={styles.searchfield}
        {...register('Search', { required: false })}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
