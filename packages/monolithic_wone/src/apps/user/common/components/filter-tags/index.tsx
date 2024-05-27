import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Badge } from "reactstrap";

import styles from "./index.module.scss";

interface FilterTagsProps {
  filterTags: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export const FilterTags = ({
  filterTags,
  onChange,
  className,
}: FilterTagsProps) => {
  const [filterTagsInner, setFilterTagsInner] = useState([]);
  const [filterTagsSelection, setFilterTagsSelection] = useState(
    filterTags.map((tag) => ({
      id: tag,
      label: tag,
      value: tag,
      selected: false,
    }))
  );

  useEffect(() => {
    if (JSON.stringify(filterTags) !== JSON.stringify(filterTagsInner)) {
      const nextfilterTagsSelection = filterTags.map((tag) => ({
        id: tag,
        label: tag,
        value: tag,
        selected: false,
      }));
      setFilterTagsInner(filterTags);
      setFilterTagsSelection(nextfilterTagsSelection);
    }
  }, [filterTags, filterTagsInner]);

  const handleClick = (value) => {
    const nextfilterTagsSelection = filterTagsSelection.map((tagInner) => {
      if (tagInner.value === value) {
        return {
          ...tagInner,
          selected: !tagInner.selected,
        };
      }
      return tagInner;
    });
    setFilterTagsSelection(nextfilterTagsSelection);
    if (typeof onChange === "function" && onChange) {
      onChange(
        nextfilterTagsSelection
          .filter((tag) => tag.selected)
          .map((tag) => tag.value)
      );
    }
  };

  return (
    <section className={clsx(styles["pill-container"], className)}>
      <ul>
        {filterTagsSelection.length > 0 &&
          filterTagsSelection.map((tagInner) => (
            <li key={tagInner.id}>
              <Badge
                pill
                onClick={() => handleClick(tagInner.value)}
                className={clsx(
                  styles["pill"],
                  tagInner.selected && styles["selected"]
                )}
              >
                {tagInner.label}
              </Badge>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default FilterTags;
