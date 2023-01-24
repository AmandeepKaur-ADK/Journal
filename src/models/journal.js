const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const JournalSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    markdown:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML:{
        type: String,
        required: true
    }

})

JournalSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    if(this.markdown){
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
    }
    next();
})
const Journal = mongoose.model("Journal", JournalSchema);
module.exports = Journal;