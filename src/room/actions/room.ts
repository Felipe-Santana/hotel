import { Amenity, Room } from '../model/room.js';
import { z as zod } from 'zod';

export class RoomActions {
	private readonly schema = zod.object({
		identification: zod.string({
			required_error: 'Missing property "identification"',
			invalid_type_error: 'Invalid type for property "identification", should be a string'
		}),
		description: zod.optional(
			zod.string({
				invalid_type_error: 'Invalid type for property "description", should be a string'
			})
		),
		number_of_beds: zod.number({
			required_error: 'Missing property "number_of_beds"',
			invalid_type_error: 'Invalid type for property "number_of_beds", should be a number'
		}).positive(),
		size_meters: zod.number({
			required_error: 'Missing property "size_meters"',
			invalid_type_error: 'Invalid type for property "size_meters", should be a number'
		}).positive(),
		smoking: zod.optional(
			zod.boolean({
				invalid_type_error: 'Invalid type for property "smoking", should be a boolean'
			})
		),
		amenities: zod.optional(
			zod.array(
				zod.object({
					label: zod.string({
						required_error: 'Missing property "label"',
						invalid_type_error: 'Invalid type for property "label", should be a string'
					})
				})
			)
		),
		number_of_bathrooms: zod.number({
			required_error: 'Missing property "number_of_bathrooms"',
			invalid_type_error: 'Invalid type for property "number_of_bathrooms", should be a number'
		}).positive()
	});

	createRoom(room: Room) {
		const validation = this.validateRoom(room);

		if (!validation.success) {
			return validation;
		}

		const createdRoom = new Room(
			room.number_of_beds,
			room.identification,
			room.size_meters,
			room.number_of_bathrooms,
			[],
			room.smoking,
			room.description
		);

		if (room.amenities && Array.isArray(room.amenities)) {
			for (const amenity of room.amenities) {
				if (!amenity.label || typeof amenity.label !== 'string' || amenity.label.trim() === '') continue;
				createdRoom.amenities.push(new Amenity(
					amenity.label,
					amenity.label.toLocaleLowerCase().replace(/\s/g, '_')
				));
			}
		}

		return createdRoom;
	}

	validateRoom(room: Room) {
		const result = this.schema.safeParse(room);

		if (!result.success) {
			return {
				success: false,
				error: result.error.format()
			};
		}

		return {
			success: true
		};
	}
}
