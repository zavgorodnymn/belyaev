import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  FileDownload as FileDownloadIcon,
  Print as PrintIcon
} from '@mui/icons-material';

const ScheduleToolbar = ({ onAddClick, canEdit, onExportPDF, onExportExcel }) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
      {canEdit && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
        >
          Добавить занятие
        </Button>
      )}

      <ButtonGroup variant="outlined">
        <Tooltip title="Экспорт в PDF">
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={onExportPDF}
          >
            PDF
          </Button>
        </Tooltip>
        <Tooltip title="Экспорт в Excel">
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={onExportExcel}
          >
            Excel
          </Button>
        </Tooltip>
        <Tooltip title="Печать">
          <Button
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Печать
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
};

export default ScheduleToolbar; 