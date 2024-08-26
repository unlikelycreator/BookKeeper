import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Fab,
    IconButton,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { GridView as GridViewIcon, ViewAgenda as ViewAgendaIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import FavoriteIcon
import { fetchBooks, addBook, updateBook } from './HomeHandlers'; // Import API handlers
import SlidingModal from './SlidingModal'; // Import the custom modal

const initialBooks = [];

export default function Home() {
    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState(initialBooks);
    const [selectedBook, setSelectedBook] = useState(null);
    const [favoriteFilter, setFavoriteFilter] = useState('');
    const [seriesFilter, setSeriesFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const [formData, setFormData] = useState({
        bookName: '',
        series: false,
        favorite: false,
        seriesName: '',
        genre: '',
        author: '',
        status: '',
        type: '',
        rating: '',
        description: '',
        image: '',
    });
    const [view, setView] = useState('side');

    useEffect(() => {
        // Load the view from localStorage
        const storedView = localStorage.getItem('view') || 'side';
        setView(storedView);
    }, []);

    const handleToggle = () => {
        const newView = view === 'side' ? 'top' : 'side';
        setView(newView);
        localStorage.setItem('view', newView);
        onToggle(newView);
    };


    useEffect(() => {
        const fetchBooksData = async () => {
            const UserId = localStorage.getItem('UserId');
            try {
                const books = await fetchBooks(UserId);
                setBooks(books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooksData();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFormData({
            bookName: '',
            series: false,
            favorite: false,
            seriesName: '',
            genre: '',
            author: '',
            status: '',
            type: '',
            rating: '',
            description: '',
            image: '',
        });
        setOpen(false)
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UserId = localStorage.getItem('UserId');
        const bookId = selectedBook?._id;
        try {
            if (selectedBook) {
                // Update existing book
                await updateBook({ ...formData, bookId, UserId });
                setBooks(books.map(book => (book._id === selectedBook._id ? formData : book)));
            } else {
                await addBook({ ...formData, UserId });
                setBooks([...books, { ...formData, UserId }]);
            }
            setFormData({
                bookName: '',
                series: false,
                favorite: false,
                seriesName: '',
                genre: '',
                author: '',
                status: '',
                type: '',
                rating: '',
                description: '',
                image: '',
            });
            setSelectedBook(null);
            handleClose();
        } catch (error) {
            console.error('Error handling book submission:', error);
        }
    };

    const handleCardDoubleClick = (book) => {
        setSelectedBook(book);
        setFormData({
            bookName: book.bookName || '',
            series: book.series || false,
            favorite: book.favorite || false,
            seriesName: book.seriesName || '',
            genre: book.genre || '',
            author: book.author || '',
            status: book.status || '',
            type: book.type || '',
            rating: book.rating || '',
            description: book.description || '',
            image: book.image || '',
        });
        setOpen(true);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'favorite':
                setFavoriteFilter(value);
                break;
            case 'series':
                setSeriesFilter(value);
                break;
            case 'status':
                setStatusFilter(value);
                break;
            case 'genre':
                setGenreFilter(value);
                break;
            case 'type':
                setTypeFilter(value);
                break;
            default:
                break;
        }
    };

    const filteredBooks = books.filter((book) => {
        return (
            (favoriteFilter === '' || (favoriteFilter === 'favorite' && book.favorite)) &&
            (seriesFilter === '' || (seriesFilter === 'series' && book.series)) &&
            (statusFilter === '' || book.status === statusFilter) &&
            (genreFilter === '' || book.genre === genreFilter) &&
            (typeFilter === '' || book.type === typeFilter)
        );
    });

    return (
        <Container maxWidth={false}>
            <Box
                sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                }}
            >
                <IconButton onClick={handleToggle} sx={{border: 'none', outline: 'none'}} aria-label="toggle view">
                    {view === 'side' ? <GridViewIcon />  : <ViewAgendaIcon />}
                </IconButton>

                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                    }}
                >
                    <FormControl sx={{ minWidth: 100 }}>
                        <TextField
                            select
                            label="Favorite"
                            name="favorite"
                            value={favoriteFilter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                sx: { height: 36, fontSize: 12 },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="favorite">Favorite</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ minWidth: 100 }}>
                        <TextField
                            select
                            label="Series"
                            name="series"
                            value={seriesFilter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                sx: { height: 36, fontSize: 12 },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="series">Series</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ minWidth: 100 }}>
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={statusFilter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                sx: { height: 36, fontSize: 12 },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Wishlist">Wishlist</MenuItem>
                            <MenuItem value="Not Started">Not Started</MenuItem>
                            <MenuItem value="Reading">Reading</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ minWidth: 100 }}>
                        <TextField
                            select
                            label="Genre"
                            name="genre"
                            value={genreFilter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                sx: { height: 36, fontSize: 12 },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Fiction">Fiction</MenuItem>
                            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                            <MenuItem value="Fantasy">Fantasy</MenuItem>
                        </TextField>
                    </FormControl>

                    <FormControl sx={{ minWidth: 100 }}>
                        <TextField
                            select
                            label="Type"
                            name="type"
                            value={typeFilter}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                sx: { height: 36, fontSize: 12 },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Paperback">Paperback</MenuItem>
                            <MenuItem value="Hardcover">Hardcover</MenuItem>
                            <MenuItem value="Audiobook">Audiobook</MenuItem>
                            <MenuItem value="Summary">Summary</MenuItem>
                        </TextField>
                    </FormControl>
                </Box>
            </Box>

            {view === 'side' ?
                (<>
                    <Grid container max spacing={2} >
                        {filteredBooks.map((book, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card
                                    onDoubleClick={() => handleCardDoubleClick(book)}
                                    sx={{
                                        position: 'relative',
                                        boxShadow: 3,
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s ease-in-out',
                                        display: 'flex', // Arrange children side by side
                                        '&:hover': {
                                            transform: 'scale(1.01)',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    {book.favorite && (
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                color: 'red',
                                                zIndex: 1,
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            <FavoriteIcon />
                                        </IconButton>
                                    )}
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 110,
                                            height: 180,
                                            objectFit: 'cover',
                                        }}
                                        image={book.image}
                                        alt={book.bookName}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1, // Allow the content part to take up the remaining space

                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, p: 1 }}>
                                            <Typography
                                                className="card-title"
                                                variant="body1"
                                                mb={1}
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {book.bookName}
                                            </Typography>
                                            <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        backgroundColor: '#9dc2ff',
                                                        color: "white",
                                                        padding: '2px 5px',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    {book.genre}
                                                </Box>
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                    fontSize: '12px',
                                                    mt: 2,
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {book.description}
                                            </Typography>
                                        </CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderTop: '0.5px solid #f2f5f7',
                                                backgroundColor: 'white',
                                                padding: '8px 8px',
                                                m: 0
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    maxWidth: '150px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',

                                                    textOverflow: 'ellipsis',
                                                }}
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {book.author}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                {book.rating}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>

                </>)
                : (
                    <>
                        <Grid container max spacing={2} >
                            {filteredBooks.map((book, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                    <Card
                                        onDoubleClick={() => handleCardDoubleClick(book)}
                                        sx={{
                                            position: 'relative',
                                            boxShadow: 3,
                                            overflow: 'hidden',
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.01)',
                                                cursor: 'pointer'
                                            },
                                        }}>
                                        {book.favorite && (
                                            <IconButton
                                                sx={{
                                                    position: 'absolute',
                                                    top: 120,
                                                    right: 8,
                                                    color: 'red',
                                                    zIndex: 1,
                                                    backgroundColor: 'white'
                                                }}
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                        )}
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={book.image}
                                            alt={book.bookName}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography className="card-title" variant="body1" mb={1} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                                {book.bookName}
                                            </Typography>
                                            <Typography color="text.secondary" style={{ fontSize: '12px' }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        backgroundColor: '#e0f7fa',
                                                        padding: '2px 8px',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    {book.genre}
                                                </Box>
                                            </Typography>
                                        </CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '8px 8px',
                                                backgroundColor: '#f5f5f5',
                                                borderTop: '1px solid #ddd',
                                            }}
                                        >
                                            <Typography sx={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }} variant="body2" color="text.secondary">
                                                {book.author}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                {book.rating}
                                            </Typography>
                                        </Box>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>

                    </>
                )}

            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>

            <SlidingModal open={open} onClose={handleClose}>
                <Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="h2">
                            {selectedBook ? 'Update Book Details' : 'Add New Book'}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        {/* Your existing form fields */}
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="series"
                                            checked={formData.series}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Part of Series"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="favorite"
                                            checked={formData.favorite}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Favorite"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Cover Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Book Title"
                                    name="bookName"
                                    value={formData.bookName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Series Title (If series checked)"
                                    name="seriesName"
                                    value={formData.seriesName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal" size="small" required>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        label="Status"
                                    >
                                        <MenuItem value="Wishlist">Wishlist</MenuItem>
                                        <MenuItem value="Not Started">Not Started</MenuItem>
                                        <MenuItem value="Reading">Reading</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal" size="small" required>
                                    <InputLabel>Genre</InputLabel>
                                    <Select
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleChange}
                                        label="Genre"
                                    >
                                        <MenuItem value="Fiction">Fiction</MenuItem>
                                        <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                                        <MenuItem value="Science">Science</MenuItem>
                                        <MenuItem value="Fantasy">Fantasy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal" size="small" required>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value="Paperback">Paperback</MenuItem>
                                        <MenuItem value="Hardcover">Hardcover</MenuItem>
                                        <MenuItem value="Audiobook">Audiobook</MenuItem>
                                        <MenuItem value="Summary">Summary</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Rating (min:1.0 - max:5.0)"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="number"
                                    inputProps={{ step: "0.1", min: "0", max: "5" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Your Book review"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Close
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {selectedBook ? 'Update Details' : 'Add to Library'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </SlidingModal>
        </Container>
    );
}
