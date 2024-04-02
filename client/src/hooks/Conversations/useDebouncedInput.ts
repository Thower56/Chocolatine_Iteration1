import debounce from 'lodash/debounce';
import React, { useState, useCallback } from 'react';
import type { SetterOrUpdater } from 'recoil';
import type { TSetOption } from '~/common';

/** A custom hook that accepts a setOption function and an option key (e.g., 'title').
It manages a local state for the option value, a debounced setter function for that value,
and returns the local state value, its setter, and an onChange handler suitable for inputs. */
function useDebouncedInput({
  setOption,
  setter,
  optionKey,
  initialValue,
  delay = 450,
}: {
  setOption?: TSetOption;
  setter?: SetterOrUpdater<string>;
  optionKey?: string | number;
  initialValue: unknown;
  delay?: number;
}): [
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | unknown) => void,
  unknown,
  SetterOrUpdater<string>,
  // (newValue: string) => void,
] {
  const [value, setValue] = useState(initialValue);

  /** A debounced function to call the passed setOption with the optionKey and new value.
   *
  Note: We use useCallback to ensure our debounced function is stable across renders. */
  const setDebouncedOption = useCallback(
    debounce(setOption && optionKey ? setOption(optionKey) : setter, delay),
    [],
  );

  /** An onChange handler that updates the local state and the debounced option */
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | unknown) => {
      const newValue: unknown =
        typeof e !== 'object'
          ? e
          : (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)?.target.value;
      setValue(newValue);
      setDebouncedOption(newValue);
    },
    [setDebouncedOption],
  );
  return [onChange, value, setValue];
}

export default useDebouncedInput;
