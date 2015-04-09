var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required:'(PATH) is required'},
    featured: {type:Boolean, required:'(PATH) is required'},
    published: {type: Date, required:'(PATH) is required'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('September 13, 2014 09:13:00'), tags: ['C#']});
            Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('October 01, 2014 11:13:00'), tags: ['C#']});
            Course.create({title: 'Super Duper Expert C#', featured: true, published: new Date('October 15, 2014 11:13:00'), tags: ['C#']});
            Course.create({title: 'Visual Basic for Visual Basic Developers', featured: true, published: new Date('October 25, 2014 11:13:00'), tags: ['VB']});
            Course.create({title: 'Pedantic C++', featured: false, published: new Date('November 01, 2014 10:00:02'), tags: ['C++']});
            Course.create({title: 'Javascript for People Over 20', featured: false, published: new Date('November 10, 2014 11:13:00'), tags: ['JS']});
            Course.create({title: 'Maintainable code for Cowards', featured: false, published: new Date('November 20, 2014 11:13:00'), tags: ['Coding']});
        } else {
            console.log('Courses already created');
        }

    })
}

exports.createDefaultCourses = createDefaultCourses;