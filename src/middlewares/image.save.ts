import multer from 'multer';
import ui from 'uniqid';

const upload = multer({
    storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/card_images');
    },
    filename: function (req, file, cb) {
        var id_card = ui.process();
        cb(null, `${id_card}.jpg`);
    }
})});

export default upload;