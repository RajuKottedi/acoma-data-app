angular.module('app')

	.controller('newFind.controller', ['$scope', '$state', '$timeout', 

		function ($scope, $state, $timeout) {

			$scope.heading = 'Back to Dashboard';

			$scope.transmitting = false;

			$scope.formData = {};

			$scope.data = [{
				sectionTitle: 'Find/Site Information',
				expandedDisplay: false,
				questions: [{
					id: 'site',
					label: 'Site',
					description: '',
					inputType: 'text',
					disabled: true,
					value: 'Example Site Name',
					placeholder: 'Site name'
				}, {
					id: 'lat',
					label: 'Latitude',
					description: '',
					inputType: 'text',
					disabled: true,
					value: '',
					placeholder: 'Fetching latitude...'
				}, {
					id: 'lng',
					label: 'Longitude',
					description: '',
					inputType: 'text',
					disabled: true,
					value: '',
					placeholder: 'Fetching longitude...'
				}]
			}, {
				sectionTitle: 'Variables measured on all body sherds',
				expandedDisplay: true,
				questions: [{
					id: null,
					label: 'Clay Color/Ware',
					description: 'A sub-sample from each site will be coded by me using Munsell charts.  This variable is notincluded in the quantitative analyses.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 - indeterminate', value: 0 },
						{ label: '1 - Cibola Gray Ware', value: 1 },
						{ label: '2 - Mogollon Brown Ware', value: 2 },
						{ label: '3 - gray/brown - Puerco Valley Gray Ware', value: 3 },
						{ label: '99 - other, specify in notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Vessel Portion',
					description: '',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 - indeterminate', value: 0 },
						{ label: '1 – body sherd', value: 1 },
						{ label: '2 - rim sherd', value: 2 },
						{ label: '3 - basal sherd', value: 3 },
						{ label: '4 - rim and body sherd', value: 4 },
						{ label: '5 - base and body sherd', value: 5 },
						{ label: '6 - complete/nearby complete vessel', value: 5 },
						{ label: '99 - other, specify in notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Type (primary treatment)',
					description: 'A majority of sherds will fit into one of these categories.  If a sherd does not fit into any of these categories, code it as “other” and write a description in the notes field.  These variables arenot included in the quantitative analyses.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 - indeterminate', value: 0 },
						{ label: '1 – indented corrugated – indented corrugated sherd', value: 1 },
						{ label: '2 – zoned corrugated – both plain and indented coils are visible (transition at coils)', value: 2 },
						{ label: '3 – patterned corrugated– both plain and indented coils (transition across coils)', value: 3 },
						{ label: '4 – plain corrugated – coils without any kind of indentations', value: 4 },
						{ label: '5 – clapboard corrugated– wide or narrow clapboard corrugations (see illustrations)', value: 5 },
						{ label: '6 – plainware – smoothed surface', value: 6 },
						{ label: '7 – obliterated corrugated – corrugated surface with partiallyobliterated coils (see photos)', value: 7 },
						{ label: '99 - other, specify in notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Type of indentations',
					description: 'This category only applies to indented, zoned, and patterned corrugated sherds.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate –indentations clearly visible but type cannot be determined', value: 0 },
						{ label: '1 – finger/finger nail– finger prints/pads/nail marks clearly visible between/across coils', value: 1 },
						{ label: '3 – tool – tooled indentations', value: 3 },
						{ label: '99 - other, specify in notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Direction of indentations',
					description: 'This variable relates to the direction of the indentations in relation to the coils used to form thevessel.  As with the variable above, this is only measured on indented, zoned, and patterned corrugated sherds.  See example sherds.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – parallel – the indentation is parallel with the coils (i.e., the finger was held parallel to the direction of the coils)', value: 1 },
						{ label: '2 – perpendicular – the indentation is perpendicular to the coils', value: 2 },
						{ label: '3 – oblique – the indentation is between parallel/perpendicular', value: 3 }
					]
				}, {
					id: null,
					label: 'Indentation Alignment',
					description: 'This variable relates to whether or not indentations are aligned between coils. This variable is only measured on indented, zoned, and patterned corrugated sherds.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – aligned – indentations are vertically aligned between coils', value: 1 },
						{ label: '2 – unaligned – indentations are not vertically aligned between coils', value: 2 },
						{ label: '3 – diagonally aligned – indentation clearly diagonally aligned', value: 3 }
					]
				}, {
					id: null,
					label: 'Type of surface elaborations',
					description: 'This variable refers secondary surface elaborations that are applied after the vessel is formed. The list below includes most of the secondary surface treatments that you are likely to encounter. If you encounter a surface treatment not included here, code this sherd as “other” and write a description in the notes field.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – none/indeterminate – no secondary surface elaboration visible', value: 0 },
						{ label: '1 – incised – surface is incised', value: 1 },
						{ label: '2 – punctate – the surface of the sherd has be punched with a sharp tool', value: 2 },
						{ label: '3 – appliqué – A secondary form has been applied to the surface of the sherd', value: 3 },
						{ label: '99 – other/multiple – specify in the notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Vessel form',
					description: 'The type of vessel. Use one of the following categories. If a sherd does not fit any of these categories, code it as “other” and describe it in the notes field.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – jar', value: 1 },
						{ label: '2 – bowl', value: 2 },
						{ label: '3 – ladle/scoop', value: 3 },
						{ label: '4 – seed jar', value: 4 },
						{ label: '5 – effigy', value: 6 },
						{ label: '6 – pitcher', value: 6 },
						{ label: '7 - miniature vessel', value: 7 },
						{ label: '99 – other - specify in the notes', value: 99 }
					]
				}, {
					id: null,
					label: 'Presence/absence of smudging',
					description: 'This variable refers to the presence or absence of smudging. Smudging is most common on the interior surface of bowls. It characterized as a black, waxy feeling, and reflective surface that is usually highly polished.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – smudging absent', value: 1 },
						{ label: '2 – smudging present', value: 2 }
					]
				}, {
					id: null,
					label: 'Interior surface treatment',
					description: '',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – rough – temper protrudes from unsmoothed surface', value: 1 },
						{ label: '2 – scraped – scrape/drag marks where temper protrudes', value: 2 },
						{ label: '3 – smoothed – Smooth but not shiny, a few streaks/marks may be visible', value: 3 },
						{ label: '4 – polished – surface is clearly polished with little to no temper protruding', value: 4 },
						{ label: '99 – other – specify in notes', value: 99 },
					]
				}, {
					id: null,
					label: 'Sooting',
					description: 'This variable refers to the presence or absence of sooting, defined as a dark carbon residue.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – present on exterior only', value: 1 },
						{ label: '2 – present on interior only', value: 2 },
						{ label: '3 – present on both surfaces', value: 3 },
						{ label: '4 – present on broken edges of sherd', value: 4 },
						{ label: '5 – no sooting present', value: 5 }
					]
				}, {
					id: null,
					label: 'Vessel wall thickness',
					description: 'This variable refers to the thickness of the thickest portion of the sherd. This is measured using the digital calipers. Do not measure this variable on rim or base sherds. Average of 3 measurements.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'cm'
				}, {
					id: null,
					label: 'Width of indentations',
					description: 'This variable refers to the width of indentations at the widest point. This is measured using the digital calipers. Three indentations are measured for each sherd which will later be averaged.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'cm'
				}, {
					id: null,
					label: 'Depth of indentations',
					description: 'This variable refers to the difference between the deepest portion of an indentation and the top of the adjacent coil. Three indentations are measured which will later be averaged. This is measured using the digital depth gauge.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'cm'
				}, {
					id: null,
					label: 'Coil width',
					description: 'This variable provides an estimate of the average size of coils for each sherd. This is the average of three measures from coil juncture to coil juncture.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'cm'
				}, {
					id: null,
					label: 'Number of indentations per sq cm',
					description: 'This variable refers to the number of indentations per square cm of vessel surface. This is measured by placing the 3x3 cm cardboard cutout over a sherd and recording the number of indentations that are fully visible. If measuring a zoned or patterned corrugated sherd, make sure that unindented portions of the vessel are not visible through the cardboard cutout.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'per sq cm'
				},{
					id: null,
					label: 'Proportion of obliterated coils',
					description: 'This variable refers to the proportion of coils that are obliterated. Obliteration refers to the smoothing of coil junctures so that they are only visible through the indentations. This variable is measured by counting the total number of coils and obliterated coils visible.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: ''
				}]
			}, {
				sectionTitle: 'Only measured on rim sherds',
				expandedDisplay: false,
				questions: [{
					id: null,
					label: 'Rim radius',
					description: 'This variable refers to the radius of the vessel opening. This is measured using the rim radius template chart.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'per sq cm'
				}, {
					id: null,
					label: 'Distance to coils',
					description: 'This variable refers to the distance from the top of the rim to the first exposed coil. This is measured using a flexible rule.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'per sq cm'
				}, {
					id: null,
					label: 'Rim form',
					description: 'This variable refers to the general form of the rim in cross-section. Draw rim on back of form.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – flared', value: 1 },
						{ label: '2 – incurved', value: 2 },
						{ label: '3 – straight collar', value: 3 },
						{ label: '4 – straight rim', value: 4 },
						{ label: '5 – other - specify in notes and draw', value: 5 }
					],
					unit: 'per sq cm'
				}, {
					id: null,
					label: 'Rim radius',
					description: 'This variable refers to the radius of the vessel opening. This is measured using the rim radius template chart.',
					inputType: 'number',
					disabled: false,
					value: '',
					placeholder: '',
					options: [],
					unit: 'per sq cm'
				}]
			}, {
				sectionTitle: 'Only measured on basal sherds',
				expandedDisplay: false,
				questions: [{
					id: null,
					label: 'Direction of coils',
					description: 'This variable refers to the direction that coils when looking at the bottom of the vessel from the exterior.',
					inputType: 'select',
					disabled: false,
					value: '',
					placeholder: '',
					options: [
						{ label: '0 – indeterminate', value: 0 },
						{ label: '1 – clockwise', value: 1 },
						{ label: '2 – counter-clockwise', value: 2 }
					],
					unit: ''
				}]
			}, {
				sectionTitle: 'Any other observations',
				expandedDisplay: true,
				questions: [{
					id: null,
					label: 'Notes',
					inputType: 'textarea',
					disabled: false,
					value: '',
					placeholder: 'If you chose "other" for any question, please specify here.'
				}]
			}];

			$scope.backAction = function () {
				$state.go('dashboard');
			};

			$scope.submit = function () {

				var d = new Date();

				console.log($scope.formData);

				$scope.transmitting = true;
				//replace timeout (for example purpose) with call to save to local storage calls here
				$timeout(function () {
					$scope.transmitting = false;
					$scope.saveAlert = {
						display: true,
						message: 'Successfully saved at ' + d.toTimeString()
					};
				}, 1000);
				// $scope.transmitting = false;
			};

			$scope.cancel = function () {

				//possibly pop a confirmation window for this
				$scope.formData = {};
				$state.go('dashboard');
			};

			$scope.initialize = function () {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						$scope.formData.lat = position.coords.latitude;
						$scope.formData.lng = position.coords.longitude;
					});
				}
			};

			$scope.initialize();
		}
	]);