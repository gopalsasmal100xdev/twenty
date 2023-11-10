import { useEffect } from 'react';

import { useRecordTable } from '@/ui/object/record-table/hooks/useRecordTable';
import { useView } from '@/views/hooks/useView';
import { ViewType } from '@/views/types/ViewType';

import { useFindOneObjectMetadataItem } from '../hooks/useFindOneObjectMetadataItem';
import { useTableObjects } from '../hooks/useTableObjects';

export const RecordTableEffect = () => {
  const { scopeId: objectNamePlural, setAvailableTableColumns } =
    useRecordTable();

  const {
    columnDefinitions,
    filterDefinitions,
    sortDefinitions,
    foundObjectMetadataItem,
  } = useFindOneObjectMetadataItem({
    objectNamePlural,
  });

  const {
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    setViewType,
    setViewObjectMetadataId,
  } = useView();

  useTableObjects();

  useEffect(() => {
    if (!foundObjectMetadataItem) {
      return;
    }
    setViewObjectMetadataId?.(foundObjectMetadataItem.id);
    setViewType?.(ViewType.Table);

    setAvailableSortDefinitions?.(sortDefinitions);
    setAvailableFilterDefinitions?.(filterDefinitions);
    setAvailableFieldDefinitions?.(columnDefinitions);

    setAvailableTableColumns(columnDefinitions);
  }, [
    setViewObjectMetadataId,
    setViewType,
    columnDefinitions,
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    foundObjectMetadataItem,
    sortDefinitions,
    filterDefinitions,
    setAvailableTableColumns,
  ]);

  return <></>;
};