import React, { useEffect, useLayoutEffect, useState } from "react";
import clsx from "clsx";
import {
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import FilterIcon from "Assets/icon-filter.svg";

import styles from "./index.module.scss";

interface FilterPillsProps {
  filters: any[];
  onSubmitFiltersInput: (any) => void;
}

export const FilterPills = ({
  filters,
  onSubmitFiltersInput,
}: FilterPillsProps) => {
  const handleRemove = (e, filterId) => {
    const filtersCopy = JSON.parse(JSON.stringify(filters));
    const filter = filtersCopy.find((filter) => filter.id === filterId);
    const option = filter.options.find(
      (option) => option.value === e.target.value
    );

    if (option) {
      option.selected = false;
    }

    if (typeof onSubmitFiltersInput === "function" && onSubmitFiltersInput) {
      onSubmitFiltersInput(filtersCopy);
    }
  };

  return (
    <div className={styles["pill-container"]}>
      {filters.length > 0 &&
        filters.map((filter) =>
          filter.options
            .filter((option) => option.selected)
            .map((option) => (
              <Badge
                key={`${filter.id}-${option.value}`}
                pill
                className={styles["pill"]}
              >
                {option.label}
                <button
                  type="button"
                  name="remove-filter-option"
                  value={option.value}
                  onClick={(e) => handleRemove(e, filter.id)}
                  className={clsx("btn", "btn-close", styles["pill-remove"])}
                />
              </Badge>
            ))
        )}
    </div>
  );
};

interface FilterButtonProps {
  onClick?: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  const handleClick = () => {
    if (typeof onClick === "function" && onClick) {
      onClick();
    }
  };

  return (
    <div className={styles["open-dialog-button"]} onClick={handleClick}>
      <img src={FilterIcon} alt="filter-icons" />
    </div>
  );
};

interface FiltersProps {
  isOpen: boolean;
  filters?: any;
  onSubmitFiltersInput?: (any) => void;
  onClearFiltersInput?: () => void;
}

export const FilterDialog = ({
  isOpen,
  filters,
  onSubmitFiltersInput,
  onClearFiltersInput,
}: FiltersProps) => {
  const [curFilterIndex, setCurFilterIndex] = useState(0);
  const [filtersCopy, setFiltersCopy] = useState(
    filters != null ? JSON.parse(JSON.stringify(filters)) : null
  );

  useEffect(() => {
    setFiltersCopy(
      filters != null ? JSON.parse(JSON.stringify(filters)) : null
    );
  }, [filters]);

  useLayoutEffect(() => {
    if (isOpen) {
      setCurFilterIndex(0);
    }
  }, [isOpen]);

  const handleChangeFilterValue = (e, filterIndex) => {
    const newFiltersCopy = JSON.parse(JSON.stringify(filtersCopy));
    const filter = newFiltersCopy[filterIndex];
    const option = filter.options.find(
      (option) => option.value === e.target.value
    );

    if (option) {
      option.selected = e.target.checked;
    }

    setFiltersCopy(newFiltersCopy);
  };

  const handleClickNext = () => {
    setCurFilterIndex(Math.min(curFilterIndex + 1, filters.length - 1));
  };

  const handleClickApply = () => {
    if (typeof onSubmitFiltersInput === "function" && onSubmitFiltersInput) {
      onSubmitFiltersInput(filtersCopy);
    }
  };

  const handleClickClearAll = () => {
    setFiltersCopy(
      filters != null ? JSON.parse(JSON.stringify(filters)) : null
    );

    if (typeof onClearFiltersInput === "function" && onClearFiltersInput) {
      onClearFiltersInput();
    }
  };

  let curFilter, isLastFilter;
  if (filtersCopy) {
    curFilter = filtersCopy[curFilterIndex];
    isLastFilter = curFilterIndex === filtersCopy.length - 1;
  }

  return (
    curFilter && (
      <Modal
        isOpen={isOpen}
        toggle={handleClickClearAll}
        fade={false}
        className={styles["modal"]}
        contentClassName={styles["content"]}
      >
        <ModalHeader toggle={handleClickClearAll} className={styles["header"]}>
          {curFilter.label}
        </ModalHeader>
        <ModalBody className={styles["body"]}>
          <form onSubmit={!isLastFilter ? handleClickNext : handleClickApply}>
            {curFilter?.options.map((option) => (
              <div
                key={`${curFilterIndex}-${option.value}`}
                className={styles["option"]}
              >
                <label htmlFor={`${curFilterIndex}-${option.value}`}>
                  {option.label}
                </label>
                <input
                  type="checkbox"
                  id={`${curFilterIndex}-${option.value}`}
                  value={option.value}
                  name={option.value}
                  onChange={(e) => handleChangeFilterValue(e, curFilterIndex)}
                  defaultChecked={option.selected}
                />
                <span className={styles["checkmark"]}></span>
              </div>
            ))}
          </form>
        </ModalBody>
        <ModalFooter className={styles["footer"]}>
          {!isLastFilter ? (
            <Button color="primary" onClick={handleClickNext}>
              NEXT
            </Button>
          ) : (
            <Button color="primary" onClick={handleClickApply}>
              APPLY
            </Button>
          )}
          <Button color="secondary" onClick={handleClickClearAll}>
            CLEAR ALL
          </Button>
        </ModalFooter>
      </Modal>
    )
  );
};

export const useFilters = (defaultFilters) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const handleSubmitFiltersInput = (nextFilters) => {
    let nextFiltersTransformed = {};
    nextFilters.forEach((filter, index) => {
      nextFiltersTransformed[filter.id] = nextFilters[index].options
        .filter((option) => option.selected)
        .map((option) => option.value);
    });

    setFilters(nextFiltersTransformed as typeof defaultFilters);
    setIsFilterDialogOpen(false);
  };

  const handleClearFiltersInput = () => {
    setFilters(defaultFilters);
    setIsFilterDialogOpen(false);
  };

  return {
    filters,
    isFilterDialogOpen,
    onClickFilterButton: () => setIsFilterDialogOpen(true),
    onSubmitFiltersInput: handleSubmitFiltersInput,
    onClearFiltersInput: handleClearFiltersInput,
  };
};
