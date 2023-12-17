import React from 'react';
import { Control, useController } from 'react-hook-form';
import { Tag } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import ReactSelect from 'react-select';

interface TagSelectProps {
  onTagSelect: (tagId: number | null) => void;
  name: string;
  control: Control<any>
  selectedTagId?: number | null
}

const useTag = () => useQuery<Tag[]>({
  queryKey: ['tags'],
  queryFn: () => axios.get('/api/tag').then((res) => res.data.data),
  staleTime: 60 * 1000,
  retry: 3,
})

const TagSelect: React.FC<TagSelectProps> = ({ onTagSelect, name, control, selectedTagId }) => {
  const { data: tags, error, isLoading } = useTag();
  const { field } = useController({
    control,
    name,
    defaultValue: selectedTagId || null,
  });

  if (isLoading) return <Skeleton height={'2.5rem'} />

  if (error || !tags) return null;

  const options = tags.map((tag) => ({ label: tag.name, value: tag.id }));

  return (
    <>
      <ReactSelect
        options={options}
        name={name}
        isSearchable={true}
        onChange={(selectedOption: any) => {
          const selectedValue = selectedOption ? selectedOption.value : null;
          const isValidSelection = options.some((option) => option.value === selectedValue);

          if (isValidSelection) {
            onTagSelect(selectedValue);
            field.onChange(selectedValue);
          } else {
            onTagSelect(null);
            field.onChange(null);
          }
        }}
        placeholder="Choose a tag"
        value={options.find((option) => option.value === field.value)}
      />
    </>
  );
};

export default TagSelect;
