import chai from 'chai'
import StudentModel from '../../src/models/StudentModel'

chai.should()
let expect = chai.expect

describe('Student Model Test Basic API', () => {

	it('Should create new Student', (done) => {
		let student = new 
		StudentModel({
				first_name: 'eita@eita.com',
				last_name: 'eita@eita.com',
				birth_day: '12',
				email: 'eita@eita.com',
				login: 'eita@eita.com',
				password: 'eita@eita.com'
		});

		let studentPromise = student.persist();

		Promise.all([
			studentPromise
		]).then((data) => {
			if(data) done()
		}).catch(err => {
			console.log(err)
		})
	})

	it('Should get student by ID', (done) => {
		
		let student = new 
		StudentModel({
			_id: '58e32b2eae8395507b0197b8'
		}).getById();
		
		Promise.all([
			student
		]).then((data) => {
			if(data) done()
		}).catch(err => {
			console.log(err)
		})
	})

	it('Should update student by id', (done) => {
		let data = {
			_id: '58e32b2eae8395507b0197b8',
			first_name: 'mano@mano.com',
			last_name: 'mano@mano.com',
			birth_day: '12',
			email: 'mano@mano.com',
			login: 'mano@mano.com',
			password: 'ROLAAsssdasssad1'
		};

		let student = new 
		StudentModel(data).updateById();

		Promise.all([
			student
		]).then((data) => {
			console.log(data)
			if(data) done()
		}).catch(err => {
			console.log(err)
		})
	
	})

	it('Should delete student by id', (done) => {

		let data = {
			_id: '58e32b2eae8395507b0197b8',
		};

		let student = new 
		StudentModel(data).deleteById();

		Promise.all([
			student
		]).then((data) => {
			if(data) done()
			done()
		}).catch(err => {
			console.log(err)
		})

	})
})

describe('Student Model Advanced API test', () => {

	it('Should get Student by opts', (done) => {

		let data = {
      _id: '58e35226c0d554781ae43b07'
		};

		let student = new StudentModel(data).getByField()

		Promise.all([
			student
		]).then((data) => {
			if(data) done()
		}).catch((error) => {
			console.log(error)
		})
	})

	it('Shoud update Student by query and data opts', (done) => {

		let data = {
			first_name: 'mano@mano.com',
			last_name: 'mano@mano.com',
			birth_day: '12',
			email: 'mano@mano.com',
			login: 'mano@mano.com',
			password: 'ROLAAsssdasssad1'
		};

		let query = {
			_id: '58e35226c0d554781ae43b07'
		};

		let student = new StudentModel(data).updateByField(query)
		Promise.all([
			student
		]).then((data) => {
			if(data) done()
		}).catch((error) => {
			console.log(error)
		})
	})


	it('Shoud delete Student from query opts', (done) => {
		let query = {
			_id: '58e35226c0d554781ae43b07'
		};

		let student = new StudentModel().deleteByField(query)

		Promise.all([
			student
		]).then((data) => {
			if(data) done()
		}).catch((error) => {
			console.log(error)
		})
	})

})