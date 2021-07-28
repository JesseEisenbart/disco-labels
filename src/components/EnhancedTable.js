import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { visuallyHidden } from '@material-ui/utils';
import ArtistCell from './ArtistCell';

const EnhancedTable = ({ newData, updateLabelList, selectedList}) => {

	// Define header cells
	const headCells = [
		{
			id: 'artist',
			numeric: false,
			disablePadding: true,
			label: 'Artist',
		},
		{
			id: 'format',
			numeric: false,
			disablePadding: false,
			label: 'Format',
		},
		{
			id: 'mediaNumeric',
			numeric: true,
			disablePadding: false,
			label: 'Media Condition',
		},
		{
			id: 'sleeveNumeric',
			numeric: true,
			disablePadding: false,
			label: 'Sleeve Condition',
		},
		{
			id: 'price',
			numeric: true,
			disablePadding: false,
			label: 'Price',
		},
	];
	
	// Update rows when new data is received
	useEffect(() => {
		setRows(newData);
	}, [newData]);

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	// This method is created for cross-browser compatibility, if you don't
	// need to support IE11, you can use Array.prototype.sort() directly
	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
				const order = comparator(a[0], b[0]);
				if (order !== 0) return order;
				return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	// Creates header element
	function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
		const createSortHandler = (property) => (event) => {
			onRequestSort(event, property);
		};

		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
						<Checkbox
							sx={{color: 'black'}}
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{'aria-label': 'select all media'}}
						/>
					</TableCell>
					{headCells.map((headCell) => (
						<TableCell
							sx={{color: 'black'}}
							key={headCell.id}
							align='left'
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}

	EnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		onSelectAllClick: PropTypes.func.isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
		orderBy: PropTypes.string.isRequired,
		rowCount: PropTypes.number.isRequired,
	};

	const EnhancedTableToolbar = ({ numSelected }) => {
		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
					}),
				}}
			>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
					>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
					></Typography>
			)}
			</Toolbar>
		);
	};

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired,
	};

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('test');
	const [selected, setSelected] = React.useState(selectedList);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState([]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n);
			setSelected(newSelecteds);
			updateLabelList(newSelecteds);
			return;
		}
		setSelected([]);
		updateLabelList([]);
	};

	const handleClick = (event, item) => {
		const selectedIndex = selected.map(function(e) { return e.id; }).indexOf(item.id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, item);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}	

		setSelected(newSelected);
		updateLabelList(newSelected);

	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (item) => selected.map(function(e) { return e.id; }).indexOf(item.id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
								 rows.slice().sort(getComparator(order, orderBy)) */}
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											sx={{color: 'black'}}
											hover
											onClick={(event) => handleClick(event, row)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													sx={{color: 'black'}}
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												<ArtistCell img={row.imageUrl} artist={row.artist} album={row.album}/>
											</TableCell>										
											<TableCell align="left">{row.format}</TableCell>
											<TableCell align="left">{row.mediaCondition}</TableCell>
											<TableCell align="left">{row.sleeveCondition}</TableCell>
											<TableCell align="left">{"$"+row.price+" "+row.currency}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					sx={{color: 'black'}}
					rowsPerPageOptions={[5, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

export default EnhancedTable;
