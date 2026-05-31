const placeholder_Element = document.createElement("span");
document.body.append(placeholder_Element);
const placeholder_Table_Fragment = document.createDocumentFragment();

let table_Body_Element = document.getElementById("table_Body");
let table_Header_Row_Element = document.getElementById("table_Header_Row");
let download_JSON_Table_Link_Element = document.getElementById("download_JSON_Table_Link");

let filter_Completed_Checkbox_Element = document.getElementById("filter_Completed_Checkbox");

let filter_Standard_Checkbox_Element = document.getElementById("filter_Standard_Checkbox");
let filter_Raid_Checkbox_Element = document.getElementById("filter_Raid_Checkbox");
let filter_Solo_Quest_Checkbox_Element = document.getElementById("filter_Solo_Quest_Checkbox");
let filter_Reaper_Unavailable_Checkbox_Element = document.getElementById("filter_Reaper_Unavailable_Checkbox");
let filter_Challenge_Checkbox_Element = document.getElementById("filter_Challenge_Checkbox");

let adventure_Pack_Name_To_Checkbox_Element_Map = new Map();
{
	let adventure_Pack_Checkbox_Elements = document.getElementById("adventure_Packs_Selection_Section").getElementsByClassName("adventure_Pack_Checkbox");
	for(let i = 0; i < adventure_Pack_Checkbox_Elements.length; i++)
	{
		adventure_Pack_Name_To_Checkbox_Element_Map.set(adventure_Pack_Checkbox_Elements[i].value, adventure_Pack_Checkbox_Elements[i]);
	}
}

let saga_Name_To_Checkbox_Element_Map = new Map();
{
	let saga_Checkbox_Elements = document.getElementById("sagas_Selection_Section").getElementsByClassName("saga_Checkbox");
	for(let i = 0; i < saga_Checkbox_Elements.length; i++)
	{
		saga_Name_To_Checkbox_Element_Map.set(saga_Checkbox_Elements[i].value, saga_Checkbox_Elements[i]);
	}
}

let level_Lower_Limit_Input_Box_Element = document.getElementById("level_Lower_Limit_Input_Box");
let level_Upper_Limit_Input_Box_Element = document.getElementById("level_Upper_Limit_Input_Box");

let total_Experience_Lower_Limit_Input_Box_Element = document.getElementById("total_Experience_Lower_Limit_Input_Box");
let total_Experience_Upper_Limit_Input_Box_Element = document.getElementById("total_Experience_Upper_Limit_Input_Box");

let time_Lower_Limit_Input_Box_Element = document.getElementById("time_Lower_Limit_Input_Box");
let time_Upper_Limit_Input_Box_Element = document.getElementById("time_Upper_Limit_Input_Box");

let available_Favor_Lower_Limit_Input_Box_Element = document.getElementById("available_Favor_Lower_Limit_Input_Box");
let available_Favor_Upper_Limit_Input_Box_Element = document.getElementById("available_Favor_Upper_Limit_Input_Box");

let total_Favor_Lower_Limit_Input_Box_Element = document.getElementById("total_Favor_Lower_Limit_Input_Box");
let total_Favor_Upper_Limit_Input_Box_Element = document.getElementById("total_Favor_Upper_Limit_Input_Box");

let experience_Weight_Input_Box_Element = document.getElementById("experience_Weight_Input_Box");
let reaper_Experience_Weight_Input_Box_Element = document.getElementById("reaper_Experience_Weight_Input_Box");
let favor_Weight_Input_Box_Element = document.getElementById("favor_Weight_Input_Box");
let collectable_Weight_Input_Box_Element = document.getElementById("collectable_Weight_Input_Box");
let sentient_Experience_Weight_Input_Box_Element = document.getElementById("sentient_Experience_Weight_Input_Box");
let reaper_Fragment_Weight_Input_Box_Element = document.getElementById("reaper_Fragment_Weight_Input_Box");
let custom_Weight_Multiplier_Input_Box_Element = document.getElementById("custom_Weight_Multiplier_Input_Box");
let weight_Over_Time_Lower_Limit_Input_Box_Element = document.getElementById("weight_Over_Time_Lower_Limit_Input_Box");

let contains_Phrases_Input_Box_Element = document.getElementById("contains_Phrases_Input_Box");
let does_Not_Contain_Phrases_Input_Box_Element = document.getElementById("does_Not_Contain_Phrases_Input_Box");
let number_Of_Items_Sorted_Element = document.getElementById("number_Of_Items_Sorted");

let personal_Experience_Multiplier_Input_Box_Element = document.getElementById("personal_Experience_Multiplier_Input_Box");
let server_Modifier_Input_Box_Element = document.getElementById("server_Modifier_Input_Box");
let assumed_Reaper_Level_Input_Box_Element = document.getElementById("assumed_Reaper_Level_Input_Box");
let include_Saga_Experience_In_Total_Experience_Checkbox_Element = document.getElementById("include_Saga_Experience_In_Total_Experience_Checkbox");

let character_Name_Input_Box_Element = document.getElementById("character_Name_Input_Box");
let server_Dropdown_Menu_Element = document.getElementById("server_Dropdown_Menu");
let autocomplete_Adventures_On_Exit_Checkbox_Element = document.getElementById("autocomplete_Adventures_On_Exit_Checkbox");
let autocomplete_Adventures_Error_Message_Element = document.getElementById("autocomplete_Adventures_Error_Message");
let current_Character_Name_Element = document.getElementById("current_Character_Name");
let current_Character_Level_Element = document.getElementById("current_Character_Level");
let highest_Level_Of_Group_Members_Element = document.getElementById("highest_Level_Of_Group_Members");
//	let current_Group_Size_Element = document.getElementById("current_Group_Size");
let current_Adventure_Element = document.getElementById("current_Adventure");
let current_Location_Element = document.getElementById("current_Location");
let last_Completed_Adventure_Name_Element = document.getElementById("last_Completed_Adventure_Name");
let last_Completed_Adventure_Duration_Element = document.getElementById("last_Completed_Adventure_Duration");

let adventure_Name_To_Table_Index_Map = new Map();
let current_Sort_Selection = 1;

let current_Character_Level = 1;
let highest_Level_Of_Group_Members = 1;

function generate_Table_Headers()
{
	for(let i = 0; i < column_Properties.length; i++)
	{
		let new_Header = document.createElement("TH");
		new_Header.textContent = column_Properties[i].display_Name;
		new_Header.dataset.text_content = new_Header.textContent;
		new_Header.tabIndex = 0;
		new_Header.onclick = function(){sort_Table(i)};
		new_Header.onkeydown = function(){if(event.key === 'Enter' || event.key === ' '){event.preventDefault(); sort_Table(i);}};

		// Add column type class
		if(column_Properties[i].type === "Alphabetical")
		{
			new_Header.classList.add("alphabetical_Column");
		}
		else if(column_Properties[i].type === "Numerical")
		{
			new_Header.classList.add("numerical_Column");
		}
		else if(column_Properties[i].type === "Object List")
		{
			new_Header.classList.add("object_List_Column");
		}

		// Add ascending/descending class
		if(column_Properties[i].ascending === 1)
		{
			new_Header.classList.add("ascending_Column");
		}
		else
		{
			new_Header.classList.add("descending_Column");
		}

		// Mark current sort selection
		if(i === current_Sort_Selection)
		{
			new_Header.classList.add("last_Sorted_Header");
		}

		if(column_Properties[i].visible === false)
		{
			new_Header.style.display = "none";
		}
		placeholder_Table_Fragment.appendChild(new_Header);
	}
	table_Header_Row_Element.replaceChildren(placeholder_Table_Fragment);
}

let table_Body_Loaded = false;
function generate_Initial_Table()	//Converts the contents of the array into HTML
{
	for(let i = 0; i < table_Body_Array.length; i++)	//Fills the table with rows and data
	{
		let new_Table_Row = document.createElement("TR");
		for(const property in table_Body_Array[i])
		{
			let new_Table_Data = document.createElement("TD");
			if(property === "completed")
			{
				if(table_Body_Array[i].completed === true)
				{
					new_Table_Data.innerHTML = "<input type=\"checkbox\" checked>";
				}
				else
				{
					new_Table_Data.innerHTML = "<input type=\"checkbox\">";
				}
			}
			else if(property === "adventure_Name")
			{
				if(table_Body_Array[i].adventure_Link !== "")
				{
					new_Table_Data.innerHTML = "<a href = " + table_Body_Array[i].adventure_Link + ">" + table_Body_Array[i].adventure_Name + "</a>";
				}
				else
				{
					new_Table_Data.innerHTML = table_Body_Array[i].adventure_Name;
					console.error(table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name + " does not have a wiki link to the quest.");
				}
				adventure_Name_To_Table_Index_Map.set((table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name), i);
			}
			else if(property === "adventure_Pack")
			{
				if(table_Body_Array[i].adventure_Pack_Link !== "")
				{
					new_Table_Data.innerHTML = "<a href = " + table_Body_Array[i].adventure_Pack_Link + ">" + table_Body_Array[i].adventure_Pack + "</a>";
				}
				else
				{
					new_Table_Data.innerHTML = table_Body_Array[i].adventure_Pack;
					console.error(table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name + " does not have a wiki link to the adventure pack.");
				}
			}
			else if(property === "main_Chest_Properties")
			{
				new_Table_Data.classList.add("object_List_Table_Data");
				new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<div class = \"main_Chest_Properties\"><div>Named Item Chance: " + table_Body_Array[i].main_Chest_Properties.base_Named_Item_Chance + "</div><div>Extra Item Chance: " + table_Body_Array[i].main_Chest_Properties.base_Extra_Item_Chance + "</div><div>Rare Item Upgrade Chance: " + table_Body_Array[i].main_Chest_Properties.base_Rare_Item_Upgrade_Chance + "</div><div>Number of Chests: " + table_Body_Array[i].main_Chest_Properties.named_Item_Chest_Quantity + "</div></div>";
			}
			else if(property === "available_Items")
			{
				new_Table_Data.classList.add("object_List_Table_Data");
				for(let j = 0; j < table_Body_Array[i].available_Items.length; j++)
				{
					new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<span class = \"item_Single_Entry\"><span>" + table_Body_Array[i].available_Items[j].item_Minimum_Level + "</span class = \"item_Minimum_Level_Title\"><a href = " + table_Body_Array[i].available_Items[j].item_Link + "><span class = \"item_Name_Title\">" + table_Body_Array[i].available_Items[j].item_Name + "</span></a></span>";
				}
			}
			else if(property === "saga_Contribution")
			{
				if(table_Body_Array[i].saga_Contribution !== "-")
				{
					let saga_Names = table_Body_Array[i].saga_Contribution.split(", ");
					let saga_Links = table_Body_Array[i].saga_Link.split(", ");
					if(saga_Names.length !== saga_Links.length)
					{
						new_Table_Data.innerText = table_Body_Array[i].saga_Contribution;
						console.error("Saga Link error for " + table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name + ", entry " + i);
					}
					else
					{
						for(let j = 0; j < saga_Names.length; j++)
						{
							new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<a href = " + saga_Links[j] + ">" + saga_Names[j] + "</a>";
							if(j != saga_Names.length - 1)
							{
								new_Table_Data.innerHTML = new_Table_Data.innerHTML + ", ";
							}
						}
					}
				}
				else
				{
					new_Table_Data.innerText = table_Body_Array[i].saga_Contribution;
				}
			}
			else if(property === "total_Experience")
			{
				set_Total_Experience(i);
				new_Table_Data.innerText = table_Body_Array[i].total_Experience;
			}
			else if(property === "experience_Modifiers")
			{
				new_Table_Data.classList.add("object_List_Table_Data");
				for(let j = 0; j < experience_Modifier_Names.length; j++)
				{
					new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<span class = \"experience_Modifier_Single_Entry\"><span class = \"experience_Modifier_Title\">" + experience_Modifier_Names[j] + ":</span><input type = \"number\" onchange = \"set_Experience_Modifier((this.closest('tr').rowIndex - 1), " + j + ", this.value)\" class = \"experience_Modifier_Value\" id = \"" + table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name + " Experience Modifier " + j + "\" value = \"" + table_Body_Array[i].experience_Modifiers[j] + "\" step = \".05\"" + "></span>";
				}
			}
			else if(property === "optional_Objectives")
			{
				new_Table_Data.classList.add("object_List_Table_Data");
				for(let j = 0; j < table_Body_Array[i].optional_Objectives.length; j++)
				{
					//Swap in one of the following lines and remove the current implementation once Optional Objective names have been established for all quests
					//new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<span class = \"optional_Objective_Single_Entry\"><span oninput = \"set_Optional_Objective_Parameter((this.closest('tr').rowIndex - 1), " + j + ", 'included', this.checked)\" class = \"optional_Objective_Checkbox\" " + (table_Body_Array[i].optional_Objectives[j].included === true ? "checked" : "") + "></span>";
					//new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<span class = \"optional_Objective_Single_Entry\"><span class =  \"optional_Objective_Title\">" + table_Body_Array[i].optional_Objectives[j].title + ":</span><input type = \"number\" onchange = \"set_Optional_Objective_Parameter((this.closest('tr').rowIndex - 1), " + j + ", 'included', this.checked)\" class = \"optional_Objective_Checkbox\" " + (table_Body_Array[i].optional_Objectives[j].included === true ? "checked" : "") + "></span>";
					new_Table_Data.innerHTML = new_Table_Data.innerHTML + "<span class = \"optional_Objective_Single_Entry\"><input type = \"text\" onchange = \"set_Optional_Objective_Parameter((this.closest('tr').rowIndex - 1), " + j + ", 'title', this.value)\" class =  \"optional_Objective_Title\" value = \"" + table_Body_Array[i].optional_Objectives[j].title + "\">:<input type = \"number\" onchange = \"set_Optional_Objective_Parameter((this.closest('tr').rowIndex - 1), " + j + ", 'value', this.value)\" class = \"optional_Objective_Value\" id = \"" + table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name + " Optional " + j + "\" value = \"" + table_Body_Array[i].optional_Objectives[j].value + "\" step = \".05\"" + "><span class = \"optional_Objective_Experience\"></span><input type = \"checkbox\" onchange = \"set_Optional_Objective_Parameter((this.closest('tr').rowIndex - 1), " + j + ", 'included', this.checked)\" class = \"optional_Objective_Checkbox\" " + (table_Body_Array[i].optional_Objectives[j].included === true ? "checked" : "") + "></span>";
					
					set_Optional_Objective_Parameter(i, j, 'experience');
					new_Table_Data.children[j].children[2].innerText = table_Body_Array[i].optional_Objectives[j].experience;
				}
			}
			else if(property === "reaper_Experience")
			{
				set_Reaper_Experience(i);
				new_Table_Data.innerText = table_Body_Array[i].reaper_Experience;
			}
			else if(property === "available_Favor")
			{
				set_Available_Favor(i);
				new_Table_Data.innerText = table_Body_Array[i].available_Favor;
			}
			else if(property === "total_Weight")
			{
				set_Total_Weight(i);
				new_Table_Data.innerText = table_Body_Array[i].total_Weight;
			}
			else if(property === "base_Time" || property === "travel_Time")
			{
				set_Total_Time(i);
				new_Table_Data.innerText = table_Body_Array[i][property];
			}
			else if(property === "total_Weight_Over_Time")
			{
				set_Total_Weight_Over_Time(i);
				new_Table_Data.innerText = table_Body_Array[i].total_Weight_Over_Time;
			}
			else
			{
				new_Table_Data.innerText = table_Body_Array[i][property];
			}
			if(property === "base_Time" || property === "travel_Time" || property === "collectables" || property === "average_Sentient_Experience" || property === "average_Reaper_Fragments" || property === "custom_Weight" || property === "notes" || property === "damage_Reduction_Information")
			{
				new_Table_Data.setAttribute("contenteditable", "true");
			}
			new_Table_Data.setAttribute("oninput", "table_Data_Changed(this.parentNode.rowIndex - 1, " + column_Name_To_Array_Index[property] + ")");
			if(column_Properties[column_Name_To_Array_Index[property]].visible === false)
			{
				new_Table_Data.style.display = "none";
			}
			new_Table_Row.appendChild(new_Table_Data);
		}
		placeholder_Table_Fragment.appendChild(new_Table_Row);
	}
	table_Body_Element.replaceChildren(placeholder_Table_Fragment);
	filter_Table_Rows();
	table_Body_Loaded = true;
}

function filter_Table_Rows()
{
	let number_Of_Items_Filtered = 0;

	table_Body_Element.style.display = "none";	//Avoids unnecessary redrawing of Table
	number_Of_Items_Filtered = 0;

	let contains_Phrases_Array = contains_Phrases_Input_Box_Element.value.split("  ");	//Used in phrase filters
	if(contains_Phrases_Array.length === 1 && contains_Phrases_Array[0] === "")
	{
		contains_Phrases_Array = [];
	}

	let does_Not_Contain_Phrases_Array = does_Not_Contain_Phrases_Input_Box_Element.value.split("  ");	//Used in phrase filters
	if(does_Not_Contain_Phrases_Array.length === 1 && does_Not_Contain_Phrases_Array[0] === "")
	{
		does_Not_Contain_Phrases_Array = [];
	}

	adventure_Entry_Loop: for(let i = 0; i < table_Body_Element.children.length; i++)
	{
		if(filter_Completed_Checkbox_Element.checked === true)
		{
			if(table_Body_Array[i].completed === true)
			{
				table_Body_Element.children[i].style.display = "none";
				number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
				continue adventure_Entry_Loop;
			}
		}

		if
		(
			(filter_Standard_Checkbox_Element.checked === true && table_Body_Array[i].adventure_Type === "Standard")
			|| (filter_Raid_Checkbox_Element.checked === true && table_Body_Array[i].adventure_Type === "Raid")
			|| (filter_Solo_Quest_Checkbox_Element.checked === true && table_Body_Array[i].adventure_Type === "Solo Quest")
			|| (filter_Reaper_Unavailable_Checkbox_Element.checked === true && table_Body_Array[i].adventure_Type === "Reaper Unavailable")
			|| (filter_Challenge_Checkbox_Element.checked === true && table_Body_Array[i].adventure_Type === "Challenge")
		)
		{
			table_Body_Element.children[i].style.display = "none";
			number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
			continue adventure_Entry_Loop;
		}

		if(adventure_Pack_Name_To_Checkbox_Element_Map.has(table_Body_Array[i].adventure_Pack) && adventure_Pack_Name_To_Checkbox_Element_Map.get(table_Body_Array[i].adventure_Pack).checked === true)	//Check if the Adventure Pack entry matches a checked Adventure Pack filter checkbox
		{
			table_Body_Element.children[i].style.display = "none";
			number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
			continue adventure_Entry_Loop;
		}

		let saga_Contribution_Titles = table_Body_Array[i].saga_Contribution.split(', ');	//Saga contribution is stored as a string with ', ' delimiting multiple entries
		for(let j = 0; j < saga_Contribution_Titles.length; j++)
		{
			if(saga_Name_To_Checkbox_Element_Map.has(saga_Contribution_Titles[j]) && saga_Name_To_Checkbox_Element_Map.get(saga_Contribution_Titles[j]).checked === true)	//Check if the individual Saga title matches a checked Saga filter checkbox
			{
				table_Body_Element.children[i].style.display = "none";
				number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
				continue adventure_Entry_Loop;
			}
		}

		if
		(
			Number(table_Body_Array[i].level) < Number(level_Lower_Limit_Input_Box_Element.value) || Number(table_Body_Array[i].level) > Number(level_Upper_Limit_Input_Box_Element.value)
			|| Number(table_Body_Array[i].total_Experience) < Number(total_Experience_Lower_Limit_Input_Box_Element.value) || Number(table_Body_Array[i].total_Experience) > Number(total_Experience_Upper_Limit_Input_Box_Element.value)
			|| Number(table_Body_Array[i].total_Time) < Number(time_Lower_Limit_Input_Box_Element.value) || Number(table_Body_Array[i].total_Time) > Number(time_Upper_Limit_Input_Box_Element.value)
			|| Number(table_Body_Array[i].available_Favor) < Number(available_Favor_Lower_Limit_Input_Box_Element.value) || Number(table_Body_Array[i].available_Favor) > Number(available_Favor_Upper_Limit_Input_Box_Element.value)
			|| Number(table_Body_Array[i].total_Favor) < Number(total_Favor_Lower_Limit_Input_Box_Element.value) || Number(table_Body_Array[i].total_Favor) > Number(total_Favor_Upper_Limit_Input_Box_Element.value)
		)
		{
			table_Body_Element.children[i].style.display = "none";
			number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
			continue adventure_Entry_Loop;
		}

		if(table_Body_Array[i].total_Weight_Over_Time < Number(weight_Over_Time_Lower_Limit_Input_Box_Element.value))
		{
			table_Body_Element.children[i].style.display = "none";
			number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
			continue adventure_Entry_Loop;
		}

		for(let j = 0; j < contains_Phrases_Array.length; j++)
		{
			if
			(
				table_Body_Array[i].adventure_Name.toLowerCase().includes(contains_Phrases_Array[j].toLowerCase()) === false
				&& table_Body_Array[i].location.toLowerCase().includes(contains_Phrases_Array[j].toLowerCase()) === false
				&& table_Body_Array[i].adventure_Pack.toLowerCase().includes(contains_Phrases_Array[j].toLowerCase()) === false
				&& table_Body_Array[i].saga_Contribution.toLowerCase().includes(contains_Phrases_Array[j].toLowerCase()) === false
				&& table_Body_Array[i].notes.toLowerCase().includes(contains_Phrases_Array[j].toLowerCase()) === false
			)
			{
				table_Body_Element.children[i].style.display = "none";
				number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
				continue adventure_Entry_Loop;
			}
		}

		for(let j = 0; j < does_Not_Contain_Phrases_Array.length; j++)
		{
			if
			(
				table_Body_Array[i].adventure_Name.toLowerCase().includes(does_Not_Contain_Phrases_Array[j].toLowerCase()) === true
				|| table_Body_Array[i].location.toLowerCase().includes(does_Not_Contain_Phrases_Array[j].toLowerCase()) === true
				|| table_Body_Array[i].adventure_Pack.toLowerCase().includes(does_Not_Contain_Phrases_Array[j].toLowerCase()) === true
				|| table_Body_Array[i].saga_Contribution.toLowerCase().includes(does_Not_Contain_Phrases_Array[j].toLowerCase()) === true	
				|| table_Body_Array[i].notes.toLowerCase().includes(does_Not_Contain_Phrases_Array[j].toLowerCase()) === true
			)
			{
				table_Body_Element.children[i].style.display = "none";
				number_Of_Items_Filtered = number_Of_Items_Filtered + 1;
				continue adventure_Entry_Loop;
			}
		}
		table_Body_Element.children[i].style.display = "table-row";
	}
	number_Of_Items_Sorted_Element.textContent = number_Of_Items_Filtered + " Items Filtered";
	table_Body_Element.style.display = "table-row-group";	//Return the Table to visible
}

function set_Column_Visibility(column_Index, new_Visibility)
{
	if(column_Properties[column_Index].visible !== new_Visibility)
	{
		column_Properties[column_Index].visible = new_Visibility;
		if(column_Properties[column_Index].visible === true)
		{
			table_Header_Row_Element.children[column_Index].style.display = "table-cell";
			for(let i = 0; i < table_Body_Element.children.length; i++)
			{
				table_Body_Element.children[i].children[column_Index].style.display = "table-cell";
			}
		}
		else
		{
			table_Header_Row_Element.children[column_Index].style.display = "none";
			for(let i = 0; i < table_Body_Element.children.length; i++)
			{
				table_Body_Element.children[i].children[column_Index].style.display = "none";
			}
		}
	}
}

function toggle_Collapse_Target_Element(triggering_Button, toggled_Element_ID_String)
{
	if(triggering_Button.textContent[0] === 'S')
	{
		triggering_Button.textContent = "Hide" + triggering_Button.textContent.slice(4);
	}
	else
	{
		triggering_Button.textContent = "Show" + triggering_Button.textContent.slice(4);
	}
	document.getElementById(toggled_Element_ID_String).classList.toggle("expanded_Element");
}

function invert_Checkboxes(checkbox_Class_Name)
{
	let checkboxes_To_Invert = document.getElementsByClassName(checkbox_Class_Name);
	for(let i = 0; i < checkboxes_To_Invert.length; i++)
	{
		checkboxes_To_Invert[i].checked = !checkboxes_To_Invert[i].checked;
	}
	filter_Table_Rows();
}

function reset_All_Completions()
{
	for(let i = 0; i < table_Body_Array.length; i++)
	{
		if(table_Body_Array[i].completed === true)
		{
			table_Data_Changed(i, column_Name_To_Array_Index.completed);
		}
	}
}

let experience_Modifier_Names = ["Delving Bonus","First-time Difficulty", "Tome of Learning", "Daily Bonus", "Persistence", "Flawless Victory", "Kills", "Traps", "Secret Doors", "Breakables", "Quest Ransack", "Over-level Penalty", "Power-leveling Penalty", "Reentry", "Late Entry", "Other"];
function set_Experience_Modifier(adventure_Index, modifier_Index, new_Value)
{
	table_Body_Array[adventure_Index].experience_Modifiers[modifier_Index] = new_Value;
	table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.experience_Modifiers].children[modifier_Index].children[1].value = new_Value;
	if(modifier_Index === 2 || modifier_Index === 11 || modifier_Index === 12 || modifier_Index === 13 || modifier_Index === 14)
	{
		for(let i = 0; i < table_Body_Array[adventure_Index].optional_Objectives.length; i++)
		{
			set_Optional_Objective_Parameter(adventure_Index, i, 'experience');
		}
	}
	set_Total_Experience(adventure_Index);
	set_Reaper_Experience(adventure_Index);
	set_Total_Weight(adventure_Index);
	set_Total_Weight_Over_Time(adventure_Index);
}

function reset_All_Daily_Bonuses()
{
	for(let i = 0; i < table_Body_Array.length; i++)
	{
		if(table_Body_Array[i].adventure_Tier === "Heroic")
		{
			set_Experience_Modifier(i, 3, .25);
		}
		else
		{
			set_Experience_Modifier(i, 3, .4);
		}
	}
}

function set_Delving_Bonus(adventure_Index)
{
	if(table_Body_Array[adventure_Index].completed === true)
	{
		set_Experience_Modifier(adventure_Index, 0, 0);
		return;
	}
	switch(table_Body_Array[adventure_Index].adventure_Type)
	{
		case "Solo Quest":
		case "Challenge":
			set_Experience_Modifier(adventure_Index, 0, 0);	//No Delving Bonus available
			break;
		case "Reaper Unavailable":
		if(table_Body_Array[adventure_Index].adventure_Tier === "Heroic" && highest_Level_Of_Group_Members - 2 > table_Body_Array[adventure_Index].level)
		{
			set_Experience_Modifier(adventure_Index, 0, .5);	//Elite Delving Bonus, halved for overlevel in Heroic
		}
		else if(table_Body_Array[adventure_Index].adventure_Tier !== "Heroic" && highest_Level_Of_Group_Members - 4 > table_Body_Array[adventure_Index].level)
		{
			set_Experience_Modifier(adventure_Index, 0, .5);	//Elite Delving Bonus, halved for overlevel in Epic/Legendary
		}
		else
		{
			set_Experience_Modifier(adventure_Index, 0, 1);	//Elite Delving Bonus
		}
		break;
		case "Standard":
		case "Raid":
		if(table_Body_Array[adventure_Index].adventure_Tier === "Heroic")
		{
			if(highest_Level_Of_Group_Members - 4 > table_Body_Array[adventure_Index].level)
			{
				set_Experience_Modifier(adventure_Index, 0, .5);	//Elite Delving Bonus, halved for overlevel in Heroic
			}
			else if(highest_Level_Of_Group_Members - 2 > table_Body_Array[adventure_Index].level)
			{
				set_Experience_Modifier(adventure_Index, 0, .75);	//Reaper Delving Bonus, halved for overlevel in Heroic
			}
			else
			{
				set_Experience_Modifier(adventure_Index, 0, 1.5);	//Reaper Delving Bonus
			}
		}
		else
		{
			if(highest_Level_Of_Group_Members - 6 > table_Body_Array[adventure_Index].level)
			{
				set_Experience_Modifier(adventure_Index, 0, .5);	//Elite Delving Bonus, halved for overlevel in Epic/Legendary
			}
			else if(highest_Level_Of_Group_Members - 4 > table_Body_Array[adventure_Index].level)
			{
				set_Experience_Modifier(adventure_Index, 0, .75);	//Reaper Delving Bonus, halved for overlevel in Epic/Legendary
			}
			else
			{
				set_Experience_Modifier(adventure_Index, 0, 1.5);	//Reaper Delving Bonus
			}
		}
	}
}

function set_Tome_Of_Learning_Bonus(adventure_Index)
{
	if(table_Body_Array[adventure_Index].adventure_Type !== "Challenge")
	{
		if(current_Character_Level < 20 && table_Body_Array[adventure_Index].adventure_Tier === "Heroic")
		{
			if(table_Body_Array[adventure_Index].completed === false)
			{
				set_Experience_Modifier(adventure_Index, 2, .5);	//First Time Greater Heroic Tome of Learning Bonus
			}
			else
			{
				set_Experience_Modifier(adventure_Index, 2, .2);	//Repeat Greater Heroic Tome of Learning Bonus
			}
		}
		else if((current_Character_Level >= 20 && current_Character_Level < 30) || ((current_Character_Level < 20 && table_Body_Array[adventure_Index].adventure_Tier !== "Heroic")))
		{
			if(table_Body_Array[adventure_Index].completed === false)
			{
				set_Experience_Modifier(adventure_Index, 2, .25);	//First Time Greater Epic Tome of Learning Bonus
			}
			else
			{
				set_Experience_Modifier(adventure_Index, 2, .1);	//Repeat Greater Epic Tome of Learning Bonus
			}
		}
		else if(current_Character_Level >= 30)
		{
			set_Experience_Modifier(adventure_Index, 2, 0);	//No Legendary Tomes of Learning currently available
		}
	}
	else
	{
		set_Experience_Modifier(adventure_Index, 2, 0);	//Challenges will be handled later
	}
}

const over_Level_Penalties = [0, 0, -.1, -.25, -.5, -.75, -.99, -1];
function set_Over_Level_Penalty(adventure_Index)
{
	if(current_Character_Level >= 30 && table_Body_Array[adventure_Index].adventure_Tier !== "Legendary")
	{
		set_Experience_Modifier(adventure_Index, 11, -1);
		return;
	}
	let effective_Adventure_Level = table_Body_Array[adventure_Index].level;
	switch(table_Body_Array[adventure_Index].adventure_Type)
	{
		case "Standard":
		case "Raid":
		case "Reaper Unavailable":
			effective_Adventure_Level = effective_Adventure_Level + 2;
		break;
	}
	if(table_Body_Array[adventure_Index].adventure_Name === "Devil Assault" && table_Body_Array[adventure_Index].adventure_Tier === "Heroic")
	{
		effective_Adventure_Level = 18;
	}
	if(effective_Adventure_Level >= 20)
	{
		set_Experience_Modifier(adventure_Index, 11, 0);
		return;
	}
	else
	{
		set_Experience_Modifier(adventure_Index, 11, over_Level_Penalties[Math.max(0, Math.min(7, highest_Level_Of_Group_Members - effective_Adventure_Level))]);
		return;
	}
}

function set_Power_Leveling_Penalty(adventure_Index)
{
	if(current_Character_Level >= 20)
	{
		set_Experience_Modifier(adventure_Index, 12, 0);
	}
	else
	{
		let current_Multiplier = 1;
		for(let i = 3; i < highest_Level_Of_Group_Members - current_Character_Level; i++)
		{
			current_Multiplier = current_Multiplier * .5;
		}
		set_Experience_Modifier(adventure_Index, 12, current_Multiplier - 1);
	}
}

let optional_Objective_Property_Name_To_Index = {title: 0, value: 1, experience: 2, included: 3};
function set_Optional_Objective_Parameter(adventure_Index, optional_Objective_Index, property_Name, new_Value = 0)
{
	if(property_Name === "title")
	{
		table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].title = new_Value;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.optional_Objectives].children[optional_Objective_Index].children[optional_Objective_Property_Name_To_Index[property_Name]].value = table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].title;
		}
	}
	else if(property_Name === "value")
	{
		table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].value = new_Value;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.optional_Objectives].children[optional_Objective_Index].children[optional_Objective_Property_Name_To_Index[property_Name]].value = table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].value;
		}
		set_Optional_Objective_Parameter(adventure_Index, optional_Objective_Index, 'experience');
	}
	else if(property_Name === "experience")
	{
		table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].experience = 
		Math.trunc
		(
			(
				Math.fround(table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].value)
				*
				(
					table_Body_Array[adventure_Index].base_Experience
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[2]))
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[11]))
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[12]))
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[13]))
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[14]))
					+ Math.trunc(table_Body_Array[adventure_Index].base_Experience * Math.fround(server_Modifier_Input_Box_Element.value))
				)
			)
			* Math.fround(personal_Experience_Multiplier_Input_Box_Element.value)
		);
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.optional_Objectives].children[optional_Objective_Index].children[optional_Objective_Property_Name_To_Index[property_Name]].innerText = table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].experience;
		}
	}
	else if(property_Name === "included")
	{
		table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].included = new_Value;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.optional_Objectives].children[optional_Objective_Index].children[optional_Objective_Property_Name_To_Index[property_Name]].checked = table_Body_Array[adventure_Index].optional_Objectives[optional_Objective_Index].included;
		}
	}
	if(property_Name === "value" || property_Name === "included")
	{
		set_Total_Experience(adventure_Index);
		set_Total_Weight(adventure_Index);
		set_Total_Weight_Over_Time(adventure_Index);
	}
}

function set_Total_Experience(adventure_Index)
{
	if(table_Body_Array[adventure_Index].experience_Modifiers[11] + table_Body_Array[adventure_Index].experience_Modifiers[12] <= -1)
	{
		table_Body_Array[adventure_Index].total_Experience = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Experience].textContent = table_Body_Array[adventure_Index].total_Experience;
		}
		return;
	}
	if(current_Character_Level === 34)
	{
		table_Body_Array[adventure_Index].total_Experience = 0;	//Maximum level- no regular experience can be awarded
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Experience].textContent = table_Body_Array[adventure_Index].total_Experience;
		}
		return;
	}
	let total_Experience = table_Body_Array[adventure_Index].base_Experience;
	for(let i = 0; i < table_Body_Array[adventure_Index].experience_Modifiers.length; i++)
	{
		total_Experience = total_Experience + Math.trunc(table_Body_Array[adventure_Index].experience_Modifiers[i] * table_Body_Array[adventure_Index].base_Experience);
	}
	total_Experience = total_Experience + Math.trunc(Number(server_Modifier_Input_Box_Element.value) * table_Body_Array[adventure_Index].base_Experience);
	if(include_Saga_Experience_In_Total_Experience_Checkbox_Element.checked === true)
	{
		total_Experience = total_Experience + table_Body_Array[adventure_Index].saga_Experience;
	}
	total_Experience = Math.trunc(total_Experience * Math.fround(personal_Experience_Multiplier_Input_Box_Element.value));
	for(let i = 0; i < table_Body_Array[adventure_Index].optional_Objectives.length; i++)
	{
		if(table_Body_Array[adventure_Index].optional_Objectives[i].included === true)
		{
			total_Experience = total_Experience + table_Body_Array[adventure_Index].optional_Objectives[i].experience;
		}
	}
	table_Body_Array[adventure_Index].total_Experience = total_Experience;
	if(table_Body_Loaded === true)
	{
		table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Experience].textContent = table_Body_Array[adventure_Index].total_Experience;
	}
}

function set_Reaper_Experience(adventure_Index)
{
	if(table_Body_Array[adventure_Index].experience_Modifiers[11] + table_Body_Array[adventure_Index].experience_Modifiers[12] <= -1)	//Also indirectly handles Legendary Characters not receiving Reaper Experience in Epic or Heroic content
	{
		table_Body_Array[adventure_Index].reaper_Experience = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
		}
		return;
	}
	if(table_Body_Array[adventure_Index].adventure_Type === "Challenge" || table_Body_Array[adventure_Index].adventure_Type === "Solo Quest" || table_Body_Array[adventure_Index].adventure_Type === "Reaper Unavailable")
	{
		table_Body_Array[adventure_Index].reaper_Experience = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
		}
		return;
	}
	if(table_Body_Array[adventure_Index].adventure_Name === "Haverdasher" || table_Body_Array[adventure_Index].adventure_Name === "Return to Delera's Tomb" || table_Body_Array[adventure_Index].adventure_Name === "The Gate Chamber")
	{
		table_Body_Array[adventure_Index].reaper_Experience = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
		}
		return;
	}
	if(table_Body_Array[adventure_Index].adventure_Tier === "Heroic")
	{
		if(highest_Level_Of_Group_Members - 4 > table_Body_Array[adventure_Index].level)
		{
			table_Body_Array[adventure_Index].reaper_Experience = 0;
			if(table_Body_Loaded === true)
			{
				table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
			}
			return;
		}
	}
	else
	{
		if(highest_Level_Of_Group_Members - 6 > table_Body_Array[adventure_Index].level)
		{
			table_Body_Array[adventure_Index].reaper_Experience = 0;
			if(table_Body_Loaded === true)
			{
				table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
			}
			return;
		}
		
	}
	if(table_Body_Array[adventure_Index].completed === true && table_Body_Array[adventure_Index].adventure_Tier !== "Legendary")	//For now it is assumed Elite will be done after Reaper except in Legendary quests
	{
		table_Body_Array[adventure_Index].reaper_Experience = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
		}
		return;
	}
	let adventure_Length_Multplier = 1;
	switch(table_Body_Array[adventure_Index].adventure_Length)
	{
		case "Short":
			adventure_Length_Multplier = 0.8;
			break;
		case "Medium":
			adventure_Length_Multplier = 1;
			break;
		case "Long":
			adventure_Length_Multplier = 1.2;
			break;
		case "Very Long":
			adventure_Length_Multplier = 1.4;
			break;
		default:
			console.error(table_Body_Array[adventure_Index].adventure_Tier + " " + table_Body_Array[adventure_Index].adventure_Name + " has an unrecognized adventure_Length.");
			break;
	}
	let legendary_Adventure_Multiplier = table_Body_Array[adventure_Index].level >= 30 ? 2 : 1;
	let first_Time_Reaper_Completion_Multiplier = table_Body_Array[adventure_Index].completed === false ? 3 : 1;
	let reaper_Level = Number(assumed_Reaper_Level_Input_Box_Element.value);
	let base_Reaper_Experience = Math.trunc((50 + table_Body_Array[adventure_Index].level * 3 * reaper_Level) * adventure_Length_Multplier) * legendary_Adventure_Multiplier;
	let total_Reaper_Experience = Math.trunc(base_Reaper_Experience * Math.fround(first_Time_Reaper_Completion_Multiplier));
	for(let i = 3; i <= 11; i++)
	{
		if(i === 11)
		{
			for(let j = 0; j < first_Time_Reaper_Completion_Multiplier; j++)
			{
				total_Reaper_Experience = total_Reaper_Experience + Math.trunc(base_Reaper_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[i]));
			}
		}
		else
		{
			total_Reaper_Experience = total_Reaper_Experience + Math.trunc(base_Reaper_Experience * Math.fround(table_Body_Array[adventure_Index].experience_Modifiers[i]));
		}
	}
	total_Reaper_Experience = Math.trunc(total_Reaper_Experience * Math.fround(personal_Experience_Multiplier_Input_Box_Element.value));
	table_Body_Array[adventure_Index].reaper_Experience = total_Reaper_Experience;
	if(table_Body_Loaded === true)
	{
		table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.reaper_Experience].textContent = table_Body_Array[adventure_Index].reaper_Experience;
	}
}

function set_Available_Favor(adventure_Index)
{
	let available_Difficulties = table_Body_Array[adventure_Index].available_Adventure_Tiers.split(", ");
	let completed_On_Some_Difficulty = false;
	for(let i = 0; i < available_Difficulties.length; i++)
	{
		if(adventure_Name_To_Table_Index_Map.get(available_Difficulties[i] + " " + table_Body_Array[adventure_Index].adventure_Name) !== undefined && table_Body_Array[adventure_Name_To_Table_Index_Map.get(available_Difficulties[i] + " " + table_Body_Array[adventure_Index].adventure_Name)].completed === true)
		{
			completed_On_Some_Difficulty = true;
		}
	}
	if(completed_On_Some_Difficulty === false)
	{
		table_Body_Array[adventure_Index].available_Favor = table_Body_Array[adventure_Index].total_Favor;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.available_Favor].textContent = table_Body_Array[adventure_Index].available_Favor;
		}
	}
	else
	{
		table_Body_Array[adventure_Index].available_Favor = 0;
		if(table_Body_Loaded === true)
		{
			table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.available_Favor].textContent = table_Body_Array[adventure_Index].available_Favor;
		}
	}
}

function set_Total_Weight(adventure_Index)	//Sets the total weight in the array based on the constituent parts of the array and appropriate multipliers
{
	table_Body_Array[adventure_Index].total_Weight =
	Number((
	(table_Body_Array[adventure_Index].total_Experience * (1 / Number(experience_Weight_Input_Box_Element.value)))
	+ (table_Body_Array[adventure_Index].reaper_Experience * (1 / Number(reaper_Experience_Weight_Input_Box_Element.value)))
	+ (table_Body_Array[adventure_Index].available_Favor * (1 / Number(favor_Weight_Input_Box_Element.value)))
	+ (table_Body_Array[adventure_Index].collectables * (1 / Number(collectable_Weight_Input_Box_Element.value)))
	+ (table_Body_Array[adventure_Index].average_Sentient_Experience * (1 / Number(sentient_Experience_Weight_Input_Box_Element.value)))
	+ (table_Body_Array[adventure_Index].average_Reaper_Fragments * Number(reaper_Fragment_Weight_Input_Box_Element.value))
	+ (table_Body_Array[adventure_Index].custom_Weight * Number(custom_Weight_Multiplier_Input_Box_Element.value))
	).toFixed(3));
	if(table_Body_Loaded === true)
	{
		table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Weight].textContent = table_Body_Array[adventure_Index].total_Weight;
	}
}

function set_Total_Time(adventure_Index)
{
	table_Body_Array[adventure_Index].total_Time = Number((table_Body_Array[adventure_Index].base_Time + table_Body_Array[adventure_Index].travel_Time).toFixed(3));
	if(table_Body_Loaded === true)
	{
		table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Time].textContent = table_Body_Array[adventure_Index].total_Time;
	}
}

function set_Total_Weight_Over_Time(adventure_Index)	//Sets the total weight over time in the array based on the total weight and time
{
	table_Body_Array[adventure_Index].total_Weight_Over_Time = Number((table_Body_Array[adventure_Index].total_Weight / table_Body_Array[adventure_Index].total_Time).toFixed(3));
	if(table_Body_Loaded === true)
	{
		table_Body_Element.children[adventure_Index].children[column_Name_To_Array_Index.total_Weight_Over_Time].textContent = table_Body_Array[adventure_Index].total_Weight_Over_Time;
	}
}

function update_Table_Columns(column_Names)
{
	let columns_To_Update = column_Names.split(", ");
	for(let i = 0; i < columns_To_Update.length; i++)
	{
		switch(columns_To_Update[i])
		{
			case "optional_Objectives":
				for(let j = 0; j < table_Body_Array.length; j++)
				{
					for(let k = 0; k < table_Body_Array[j].optional_Objectives.length; k++)
					{
						set_Optional_Objective_Parameter(j, k, 'experience');
					}
				}
				break;
			case "total_Experience":
				for(let j = 0; j < table_Body_Array.length; j++)
				{
					set_Total_Experience(j);
				}
				break;
			case "reaper_Experience":
				for(let j = 0; j < table_Body_Array.length; j++)
				{
					set_Reaper_Experience(j);
				}
				break;
			case "total_Weight":
				for(let j = 0; j < table_Body_Array.length; j++)
				{
					set_Total_Weight(j);
				}
				break;
			case "total_Weight_Over_Time":
				for(let j = 0; j < table_Body_Array.length; j++)
				{
					set_Total_Weight_Over_Time(j);
				}
				break;
		}
	}
}

function generic_Stable_Sort(item_1, item_2)
{
	const value_1 = item_1[index_To_Column_Name_Array[current_Sort_Selection]];
	const value_2 = item_2[index_To_Column_Name_Array[current_Sort_Selection]];
	if(value_1 < value_2)
	{
		return -1 * column_Properties[current_Sort_Selection].ascending;
	}
	else if(value_1 > value_2)
	{
		return 1 * column_Properties[current_Sort_Selection].ascending;
	}
	else
	{
		return 0;
	}
}

function update_Table_Header_View(header_Index)
{
	table_Header_Row_Element.children[header_Index].classList.remove("ascending_Column", "descending_Column");
	if(column_Properties[header_Index].ascending === 1)
	{
		table_Header_Row_Element.children[header_Index].classList.add("ascending_Column");
	}
	else
	{
		table_Header_Row_Element.children[header_Index].classList.add("descending_Column");
	}
}

async function sort_Table(sort_Selection)    //Orders the table by a column
{
	if(sort_Selection === current_Sort_Selection)    //Flip from ascending to/from descending if the user clicks on the already selected category to sort
	{
		column_Properties[sort_Selection].ascending = column_Properties[sort_Selection].ascending * -1;
		update_Table_Header_View(sort_Selection);
	}
	table_Header_Row_Element.children[current_Sort_Selection].classList.remove("last_Sorted_Header");
	current_Sort_Selection = sort_Selection;
	table_Header_Row_Element.children[current_Sort_Selection].classList.add("last_Sorted_Header");
	await new Promise(resolve => setTimeout(resolve, 1));

	table_Body_Array.sort(generic_Stable_Sort);

	let old_Table_Body_Element_Child_Index = 0;
	let element_1 = null;
	let element_2 = null;
	let visible_Elements = 0;
	for(let i = 0; i < table_Body_Array.length; i++)
	{
		//Swap rows and update the adventure_Name_To_Table_Index_Map accordingly
		if((table_Body_Array[i].adventure_Tier + table_Body_Array[i].adventure_Name) !== table_Body_Element.children[i].children[column_Name_To_Array_Index.adventure_Tier].textContent + table_Body_Element.children[i].children[column_Name_To_Array_Index.adventure_Name].textContent)
		{
			old_Table_Body_Element_Child_Index = adventure_Name_To_Table_Index_Map.get(table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name);
			element_1 = table_Body_Element.children[i];
			element_2 = table_Body_Element.children[old_Table_Body_Element_Child_Index];
			table_Body_Element.moveBefore(placeholder_Element, element_1);
			table_Body_Element.moveBefore(element_1, element_2);
			table_Body_Element.moveBefore(element_2, placeholder_Element);
			document.body.append(placeholder_Element);
			adventure_Name_To_Table_Index_Map.set(table_Body_Array[i].adventure_Tier + " " + table_Body_Array[i].adventure_Name, i);
			adventure_Name_To_Table_Index_Map.set(table_Body_Element.children[old_Table_Body_Element_Child_Index].children[column_Name_To_Array_Index.adventure_Tier].textContent + " " + table_Body_Element.children[old_Table_Body_Element_Child_Index].children[column_Name_To_Array_Index.adventure_Name].textContent, old_Table_Body_Element_Child_Index);
		}
		if(table_Body_Element.children[i].style.display !== "none")
		{
			visible_Elements = visible_Elements + 1;
			if(visible_Elements === 5)	//Allow the UI to update the first 5 visible adventures to display quickly
			{
				await new Promise(resolve => setTimeout(resolve, 1));
			}
		}
	}
}

function convert_Table_Body_Array_To_Custom_JSON()
{
	let custom_JSON_Table_String = "[\n";
	for(let i = 0; i < table_Body_Array.length; i++)
	{
		custom_JSON_Table_String = custom_JSON_Table_String + "{\n";
		for(let j = 0; j < column_Properties.length; j++)
		{
			custom_JSON_Table_String = custom_JSON_Table_String + "\t\"" +index_To_Column_Name_Array[j] + "\": ";
			if(column_Properties[j].type === "Alphabetical")
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "\"" + table_Body_Array[i][index_To_Column_Name_Array[j]] + "\"";
			}
			else if(column_Properties[j].name === "main_Chest_Properties")
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "{\"base_Named_Item_Chance\": " + table_Body_Array[i][index_To_Column_Name_Array[j]].base_Named_Item_Chance + ", \"base_Extra_Item_Chance\": " + table_Body_Array[i][index_To_Column_Name_Array[j]].base_Extra_Item_Chance + ", \"base_Rare_Item_Upgrade_Chance\": " + table_Body_Array[i][index_To_Column_Name_Array[j]].base_Rare_Item_Upgrade_Chance + ", \"named_Item_Chest_Quantity\": " + table_Body_Array[i][index_To_Column_Name_Array[j]].named_Item_Chest_Quantity + "}";
			}
			else if(column_Properties[j].name === "available_Items")
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "[";
				for(let k = 0; k < table_Body_Array[i].available_Items.length; k++)
				{
					custom_JSON_Table_String = custom_JSON_Table_String + "{\"item_Name\": \"" + table_Body_Array[i][index_To_Column_Name_Array[j]][k].item_Name + "\", \"item_Minimum_Level\": " + table_Body_Array[i][index_To_Column_Name_Array[j]][k].item_Minimum_Level + ", \"item_Link\": \"" + table_Body_Array[i][index_To_Column_Name_Array[j]][k].item_Link + "\"}" + (k === table_Body_Array[i].available_Items.length - 1 ? "" : ", ");
				}
				custom_JSON_Table_String = custom_JSON_Table_String + "]";
			}
			else if(column_Properties[j].name === "experience_Modifiers")
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "[";
				for(let k = 0; k < table_Body_Array[i].experience_Modifiers.length; k++)
				{
					custom_JSON_Table_String = custom_JSON_Table_String + table_Body_Array[i][index_To_Column_Name_Array[j]][k] + (k === table_Body_Array[i].experience_Modifiers.length - 1 ? "" : ", ");
				}
				custom_JSON_Table_String = custom_JSON_Table_String + "]";
			}
			else if(column_Properties[j].name === "optional_Objectives")
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "[";
				for(let k = 0; k < table_Body_Array[i].optional_Objectives.length; k++)
				{
					custom_JSON_Table_String = custom_JSON_Table_String + "{\"title\": \"" + table_Body_Array[i][index_To_Column_Name_Array[j]][k].title + "\", \"value\": " + table_Body_Array[i][index_To_Column_Name_Array[j]][k].value + ", \"experience\": 0, \"included\": " + table_Body_Array[i][index_To_Column_Name_Array[j]][k].included + "}" + (k === table_Body_Array[i].optional_Objectives.length - 1 ? "" : ", ");
				}
				custom_JSON_Table_String = custom_JSON_Table_String + "]";
			}
			else if(column_Properties[j].calculated === true)
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "0";
			}
			else
			{
				custom_JSON_Table_String = custom_JSON_Table_String + table_Body_Array[i][index_To_Column_Name_Array[j]];
			}
			if(j !== column_Properties.length - 1)
			{
				custom_JSON_Table_String = custom_JSON_Table_String + ",\n";
			}
			else
			{
				custom_JSON_Table_String = custom_JSON_Table_String + "\n";
			}
		}
		if(i !== table_Body_Array.length - 1)
		{
			custom_JSON_Table_String = custom_JSON_Table_String + "},\n";
		}
		else
		{
			custom_JSON_Table_String = custom_JSON_Table_String + "}\n";
		}
	}
	custom_JSON_Table_String = custom_JSON_Table_String + "]";

	return custom_JSON_Table_String;
}

function save_To_Local_Storage()
{
	window.localStorage.setItem("table_Body_Data", convert_Table_Body_Array_To_Custom_JSON());

	window.localStorage.setItem("table_Filter_Level_Lower_Limit", level_Lower_Limit_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Level_Upper_Limit", level_Upper_Limit_Input_Box_Element.value);

	window.localStorage.setItem("table_Filter_Experience_Lower_Limit", total_Experience_Lower_Limit_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Experience_Upper_Limit", total_Experience_Upper_Limit_Input_Box_Element.value);

	window.localStorage.setItem("table_Filter_Time_Lower_Limit", time_Lower_Limit_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Time_Upper_Limit", time_Upper_Limit_Input_Box_Element.value);

	window.localStorage.setItem("table_Filter_Favor_Lower_Limit", total_Favor_Lower_Limit_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Favor_Upper_Limit", total_Favor_Upper_Limit_Input_Box_Element.value);

	window.localStorage.setItem("table_Filter_Experience_Weight", experience_Weight_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Reaper_Experience_Weight", reaper_Experience_Weight_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Favor_Weight", favor_Weight_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Custom_Weight_Multiplier", custom_Weight_Multiplier_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_weight_Over_Time_Lower_Limit_Input_Box", weight_Over_Time_Lower_Limit_Input_Box_Element.value);

	window.localStorage.setItem("filter_Completed_Checkbox", filter_Completed_Checkbox_Element.checked);

	for(let map_Entry of adventure_Pack_Name_To_Checkbox_Element_Map)
	{
		window.localStorage.setItem(map_Entry[0] + " Filter Checkbox", map_Entry[1].checked);
	}

	window.localStorage.setItem("table_Filter_Contains_Phrases_Input_Box", contains_Phrases_Input_Box_Element.value);
	window.localStorage.setItem("table_Filter_Does_Not_Contain_Phrases_Input_Box", does_Not_Contain_Phrases_Input_Box_Element.value);

	window.localStorage.setItem("last_Sort_Selection_Ascending_State_Array", JSON.stringify(column_Properties.map(column => column.ascending)));
	window.localStorage.setItem("last_Sort_Selection", current_Sort_Selection);

	window.localStorage.setItem("character_Name_Input_Box_Element", character_Name_Input_Box_Element.value);
	window.localStorage.setItem("server_Dropdown_Menu_Element", server_Dropdown_Menu_Element.value);
	window.localStorage.setItem("autocomplete_Adventures_On_Exit_Checkbox_Element", autocomplete_Adventures_On_Exit_Checkbox_Element.checked);

	window.onbeforeunload = null;
}

function delete_Local_Storage()
{
	if(window.confirm("If local storage is empty, the program will use raw_Table_String.js to build the table the next time the page is loaded, and may be necessary for updates. It is recommended to keep your own copy of raw_Table_String.js as a back-up. Click 'OK' to delete local storage."))
	{
		window.localStorage.clear();
		window.onbeforeunload = null;
	}
}

function download_JSON_Table()
{
	let JSON_Table_String = "let column_Properties = [\n";
	for(let i = 0; i < column_Properties.length; i++)
	{
		JSON_Table_String = JSON_Table_String + "{\n";
		let keys = Object.keys(column_Properties[i]);
		for(let k = 0; k < keys.length; k++)
		{
			let value = column_Properties[i][keys[k]];
			value = (typeof value === 'string') ? "\"" + value + "\"" : value;
			JSON_Table_String = JSON_Table_String + "\t" + keys[k] + ": " + value;
			if (k < keys.length - 1)
			{
				JSON_Table_String = JSON_Table_String + ",";
			}
			JSON_Table_String = JSON_Table_String + "\n";
		}
		if(i !== column_Properties.length - 1)
		{
			JSON_Table_String = JSON_Table_String + "},\n";
		}
		else
		{
			JSON_Table_String = JSON_Table_String + "}\n";
		}
	}
	JSON_Table_String = JSON_Table_String + "];\n\n"
	+ "let column_Name_To_Array_Index = {};\n"
	+ "let index_To_Column_Name_Array = [];\n\n"
	+ "for(let i = 0; i < column_Properties.length; i++)\n{\n"
	+ "\tcolumn_Name_To_Array_Index[column_Properties[i].name] = i;\n"
	+ "\tindex_To_Column_Name_Array.push(column_Properties[i].name);\n}\n\n"
	+ "let table_Body_Array = ";
//		JSON_Table_String = JSON_Table_String + JSON.stringify(table_Body_Array, [...index_To_Column_Name_Array, "title", "value", "experience", "included"], '\t');	//Not used because it expands sub-objects, uses calculated fields, and doesn't format as preferred, so a manual string building method is used. Also out of date if ever re-enabled- include all sub-object title names in appropriate order
	JSON_Table_String = JSON_Table_String + convert_Table_Body_Array_To_Custom_JSON();
	JSON_Table_String = JSON_Table_String + ";";

	window.URL.revokeObjectURL(download_JSON_Table_Link_Element.href);
	let table_Blob = new Blob
	(
		[JSON_Table_String],
		{
			type: 'text/javascript'
		}
	);
	download_JSON_Table_Link_Element.href = window.URL.createObjectURL(table_Blob);
}

function table_Data_Changed(table_Row, table_Column)
{
	if(table_Column === column_Name_To_Array_Index.completed)
	{
		if(table_Body_Array[table_Row].completed === true)
		{
			table_Body_Array[table_Row].completed = false;
			table_Body_Element.children[table_Row].children[table_Column].children[0].checked = false;	//Changes the checkbox back to off to match the data change
			set_Delving_Bonus(table_Row);
			set_Tome_Of_Learning_Bonus(table_Row);
			if(table_Body_Array[table_Row].adventure_Type === "Reaper Unavailable")
			{
				set_Experience_Modifier(table_Row, 1, .45);	//First Time Elite Completion is assumed to be up next
				if(table_Body_Array[table_Row].adventure_Tier === "Heroic")
				{
					set_Experience_Modifier(table_Row, 3, .25);	//Heroic Daily Bonus is available
				}
				else
				{
					set_Experience_Modifier(table_Row, 3, .4);	//Epic Daily Bonus is available
				}
			}
			else if(table_Body_Array[table_Row].adventure_Type === "Solo Quest")
			{
				set_Experience_Modifier(table_Row, 1, .2);	//First Time Solo Completion is available
				if(table_Body_Array[table_Row].adventure_Tier === "Heroic")
				{
					set_Experience_Modifier(table_Row, 3, .25);	//Heroic Daily Bonus is available
				}
				else
				{
					set_Experience_Modifier(table_Row, 3, .4);	//Epic Daily Bonus is available
				}
				
			}
			else if(table_Body_Array[table_Row].adventure_Type === "Challenge")
			{
				//Handled specially for now
			}
			else	//Standard and Raid
			{
				set_Experience_Modifier(table_Row, 1, .45);	//First Time Reaper Completion is assumed to be up next
				if(table_Body_Array[table_Row].adventure_Tier === "Heroic")
				{
					set_Experience_Modifier(table_Row, 3, .25);	//Heroic Daily Bonus is available
				}
				else
				{
					set_Experience_Modifier(table_Row, 3, .4);	//Epic Daily Bonus is available
				}
				
			}
		}
		else
		{
			table_Body_Array[table_Row].completed = true;
			table_Body_Element.children[table_Row].children[table_Column].children[0].checked = true;	//Changes the checkbox to match the data change
			set_Delving_Bonus(table_Row);
			set_Tome_Of_Learning_Bonus(table_Row);
			if(table_Body_Array[table_Row].adventure_Type === "Reaper Unavailable")
			{
				set_Experience_Modifier(table_Row, 1, .2);	//First Time Hard Completion is assumed to be up next
				set_Experience_Modifier(table_Row, 3, 0);	//Daily Bonus is used up
			}
			else if(table_Body_Array[table_Row].adventure_Type === "Solo Quest")
			{
				set_Experience_Modifier(table_Row, 1, 0);	//First Time Solo Completion is used up
				set_Experience_Modifier(table_Row, 3, 0);	//Daily Bonus is used up
			}
			else if(table_Body_Array[table_Row].adventure_Type === "Challenge")
			{
				//Handled specially for now
			}
			else	//Standard and Raid
			{
				set_Experience_Modifier(table_Row, 1, .45);	//First Time Elite Completion is assumed to be up next
				set_Experience_Modifier(table_Row, 3, 0);	//Daily Bonus is used up
			}
		}

		set_Total_Experience(table_Row);
		set_Reaper_Experience(table_Row);
		let available_Difficulties = table_Body_Array[table_Row].available_Adventure_Tiers.split(", ");
		for(let i = 0; i < available_Difficulties.length; i++)
		{
			let current_Entry_Index = adventure_Name_To_Table_Index_Map.get(available_Difficulties[i] + " " + table_Body_Array[table_Row].adventure_Name);
			if(current_Entry_Index !== undefined)
			{
				set_Available_Favor(current_Entry_Index);
				set_Total_Weight(current_Entry_Index);
				set_Total_Weight_Over_Time(current_Entry_Index);
			}
		}

	}
	else if(table_Column === column_Name_To_Array_Index.experience_Modifiers)
	{
		//Do nothing but ensure it is caught here, handled by onchange handlers with set_Experience_Modifier on each of the input boxes in generate_Initial_Table's experience_Modifiers section
	}
	else if(table_Column === column_Name_To_Array_Index.optional_Objectives)
	{
		//Do nothing but ensure it is caught here, handled by onchange handlers with set_Optional_Objective_Parameter on each of the editable sections in generate_Initial_Table's optional_Objectives section
	}
	else if(table_Column === column_Name_To_Array_Index.collectables || table_Column === column_Name_To_Array_Index.average_Sentient_Experience || table_Column === column_Name_To_Array_Index.average_Reaper_Fragments || table_Column === column_Name_To_Array_Index.custom_Weight)
	{
		table_Body_Array[table_Row][index_To_Column_Name_Array[table_Column]] = Number(table_Body_Element.children[table_Row].children[table_Column].textContent);
		set_Total_Weight(table_Row);
		set_Total_Weight_Over_Time(table_Row);
	}
	else if(table_Column === column_Name_To_Array_Index.base_Time || table_Column === column_Name_To_Array_Index.travel_Time)
	{
		table_Body_Array[table_Row][index_To_Column_Name_Array[table_Column]] = Number(table_Body_Element.children[table_Row].children[table_Column].textContent);
		set_Total_Time(table_Row);
		set_Total_Weight_Over_Time(table_Row);
	}
	else
	{
		table_Body_Array[table_Row][index_To_Column_Name_Array[table_Column]] = table_Body_Element.children[table_Row].children[table_Column].textContent;
	}
	filter_Table_Rows();
	window.onbeforeunload = function(){return true};	//Sets a warning if the user navigates away after making changes, warning is removed when local storage is saved
}

function reset_Filters()
{
	level_Lower_Limit_Input_Box_Element.value = level_Lower_Limit_Input_Box_Element.getAttribute("value");	//Gets the initial value that the element began with rather than current value
	level_Upper_Limit_Input_Box_Element.value = level_Upper_Limit_Input_Box_Element.getAttribute("value");
	total_Experience_Lower_Limit_Input_Box_Element.value = total_Experience_Lower_Limit_Input_Box_Element.getAttribute("value");
	total_Experience_Upper_Limit_Input_Box_Element.value = total_Experience_Upper_Limit_Input_Box_Element.getAttribute("value");
	time_Lower_Limit_Input_Box_Element.value = time_Lower_Limit_Input_Box_Element.getAttribute("value");
	time_Upper_Limit_Input_Box_Element.value = time_Upper_Limit_Input_Box_Element.getAttribute("value");
	total_Favor_Lower_Limit_Input_Box_Element.value = total_Favor_Lower_Limit_Input_Box_Element.getAttribute("value");
	total_Favor_Upper_Limit_Input_Box_Element.value = total_Favor_Upper_Limit_Input_Box_Element.getAttribute("value");
	experience_Weight_Input_Box_Element.value = experience_Weight_Input_Box_Element.getAttribute("value");
	reaper_Experience_Weight_Input_Box_Element.value = reaper_Experience_Weight_Input_Box_Element.getAttribute("value");
	favor_Weight_Input_Box_Element.value = favor_Weight_Input_Box_Element.getAttribute("value");
	custom_Weight_Multiplier_Input_Box_Element.value = custom_Weight_Multiplier_Input_Box_Element.getAttribute("value");
	weight_Over_Time_Lower_Limit_Input_Box_Element.value = weight_Over_Time_Lower_Limit_Input_Box_Element.getAttribute("value");
	filter_Completed_Checkbox_Element.checked = false;
	
	for(let map_Entry of adventure_Pack_Name_To_Checkbox_Element_Map)
	{
		map_Entry[1].checked = false;	//map_Entry[1] is the checkbox element that is being set to false
	}

	contains_Phrases_Input_Box_Element.value = contains_Phrases_Input_Box_Element.getAttribute("value");
	does_Not_Contain_Phrases_Input_Box_Element.value = does_Not_Contain_Phrases_Input_Box_Element.getAttribute("value");
	filter_Table_Rows();
}

function character_Or_Group_Level_Changed()
{
	for(let i = 0; i < table_Body_Array.length; i++)
	{
		set_Delving_Bonus(i);
		set_Tome_Of_Learning_Bonus(i);
		set_Over_Level_Penalty(i);
		set_Power_Leveling_Penalty(i);
	}
}

let location_Retrieval_Interval_ID = "";
function disable_Location_Retrieval(error_Message)
{
	clearInterval(location_Retrieval_Interval_ID);
	location_Retrieval_Interval_ID = "";
	autocomplete_Adventures_On_Exit_Checkbox_Element.checked = false;
	autocomplete_Adventures_Error_Message_Element.innerText = error_Message;
	current_Character_Name_Element.textContent = "-";
	current_Character_Level_Element.textContent = "1";
	highest_Level_Of_Group_Members_Element.textContent = "1";
	if(highest_Level_Of_Group_Members !== 1 || current_Character_Level !== 1)
	{
		current_Character_Level = 1;
		highest_Level_Of_Group_Members = 1;
		character_Or_Group_Level_Changed();
	}
//		current_Group_Size_Element.textContent = "-";
	current_Adventure_Element.textContent = "None";
	current_Location_Element.textContent = "Unknown Location";
}

function toggle_Location_Retrieval()
{
	if(location_Retrieval_Interval_ID === "")
	{
		autocomplete_Adventures_Error_Message_Element.innerText = "";
		location_Retrieval_Interval_ID = setInterval(retrieve_Character_Location, 4000);
		retrieve_Character_Location();
	}
	else
	{
		disable_Location_Retrieval("");
	}
}

let last_Location_ID_Entered = "";
let last_Location_Entered_String = "";
let current_Adventure_Entered_String = "";
let last_Adventure_Time_Entered_String = "";
let last_Adventure_Time_In_Minutes = 0;
let current_Group_Size = 1;
let current_Adventure_Tier = "Heroic";
let adventure_Completion_Order = 1;
let retrieve_Character_Location_Error_Counter = 0;
async function retrieve_Character_Location()
{
	if(character_Name_Input_Box_Element.value === "")
	{
		disable_Location_Retrieval("Character name must be at least one character, location retrieval aborted.");
	}
	else
	{
		const url = "https://api.ddoaudit.com/v1/characters/" + server_Dropdown_Menu_Element.value + "/" + character_Name_Input_Box_Element.value;
		try
		{
			const response = await fetch(url);
			if(response.ok === false)
			{
				throw new Error(response.status);
			}
			const result = await response.json();
			let group = null;
			if(result.data.group_id !== null && result.data.group_id !== 0)
			{
				const group_Response = await fetch("https://api.ddoaudit.com/v1/characters/by-group-id/" + result.data.group_id);
				if(group_Response.ok === true)
				{
					group = await group_Response.json();
				}
			}
			current_Character_Name_Element.innerText = result.data.name;
			current_Character_Level = result.data.total_level;
			current_Character_Level_Element.innerText = current_Character_Level;
			if(last_Location_ID_Entered !== result.data.location_id)
			{
				if(last_Adventure_Time_Entered_String !== "" && current_Adventure_Entered_String !== "")
				{
					last_Completed_Adventure_Name_Element.innerText = current_Adventure_Entered_String;
					last_Adventure_Time_In_Minutes = ((new Date(result.data.last_update) - new Date(last_Adventure_Time_Entered_String)) / 60000).toFixed(3);
					last_Completed_Adventure_Duration_Element.innerText = last_Adventure_Time_In_Minutes;
					let row_Index = adventure_Name_To_Table_Index_Map.get((current_Adventure_Tier + " " + current_Adventure_Entered_String));
					if(row_Index === undefined)
					{
						row_Index = adventure_Name_To_Table_Index_Map.get(("Legendary " + current_Adventure_Entered_String));
					}
					if(row_Index === undefined)
					{
						row_Index = adventure_Name_To_Table_Index_Map.get(("Epic " + current_Adventure_Entered_String));
					}
					if(row_Index === undefined)
					{
						row_Index = adventure_Name_To_Table_Index_Map.get(("Heroic " + current_Adventure_Entered_String));
					}
					if(table_Body_Array[row_Index].completed === false)
					{
						//table_Data_Changed is used to update the checkbox
						table_Data_Changed(row_Index, column_Name_To_Array_Index.completed);
					}
					if(Number(table_Body_Array[row_Index].base_Time) > last_Adventure_Time_In_Minutes)
					{
						table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.notes].textContent = table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.notes].textContent + " Time changed from " + table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.base_Time].textContent + " to " + last_Adventure_Time_In_Minutes + ".";
						table_Data_Changed(row_Index, column_Name_To_Array_Index.notes);
						table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.base_Time].textContent = last_Adventure_Time_In_Minutes;
						table_Data_Changed(row_Index, column_Name_To_Array_Index.base_Time);
					}
					table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.notes].textContent = table_Body_Element.children[row_Index].children[column_Name_To_Array_Index.notes].textContent + " Completed at level " + current_Character_Level + ". Session order: " + adventure_Completion_Order + ".";
					table_Data_Changed(row_Index, column_Name_To_Array_Index.notes);
					adventure_Completion_Order = adventure_Completion_Order + 1;
					last_Adventure_Time_Entered_String = "";
					current_Adventure_Entered_String = "";
				}
				if(DDO_Audit_Location_ID_To_Adventure_Name_Map.has(result.data.location_id))
				{
					current_Adventure_Entered_String = DDO_Audit_Location_ID_To_Adventure_Name_Map.get(result.data.location_id);

					//Checks for quests with shared instances that DDO Audit's location tracking doesn't handle and applies various logic to select the most appropriate adventure. May not be stable depending on DDO Audit's implementation and should be verified after updates
					switch(current_Adventure_Entered_String)
					{
						//Harbor
						case "Stop Hazadill's Shipment":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Stop Hazadill's Shipment")].completed === true)
							{
								current_Adventure_Entered_String = "Retrieve the Stolen Goods";
							}
							break;

						//Marketplace
						case "Gladewatch Outpost Defense":
							if(current_Character_Level < 4 || (table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Gladewatch Outpost Defense")].completed === true && table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Kobold Assault")].completed === false))
							{
								current_Adventure_Entered_String = "Kobold Assault";
							}
							break;

						//The Catacombs
						case "The Friar's Niece":
							if(current_Character_Level < 20)
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Friar's Niece")].completed === true)
								{
									current_Adventure_Entered_String = "Return to the Sanctuary";
								}
							}
							else
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Epic The Friar's Niece")].completed === true)
								{
									current_Adventure_Entered_String = "Return to the Sanctuary";
								}
							}
							break;
						case "Endgame: The Archbishop's Fate":
							if(current_Character_Level < 20)
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Endgame: Marguerite")].completed === false)
								{
									current_Adventure_Entered_String = "";
								}
							}
							else
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Epic Endgame: Marguerite")].completed === false)
								{
									current_Adventure_Entered_String = "";
								}
							}
							break;

						//Tangleroot Gorge / Splinterskull
						case "The Last Move: The Way to Yarkuch":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic First Strike")].completed === false)
							{
								current_Adventure_Entered_String = "First Strike";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Hobgoblins' Captives")].completed === false)
							{
								current_Adventure_Entered_String = "The Hobgoblins' Captives";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Yarkuch's War-plans")].completed === false)
							{
								current_Adventure_Entered_String = "Yarkuch's War-plans";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Whisperdoom's Spawn")].completed === false)
							{
								current_Adventure_Entered_String = "Whisperdoom's Spawn";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Deadly Package: The Stronghold Key")].completed === false)
							{
								current_Adventure_Entered_String = "The Deadly Package: The Stronghold Key";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Doom of the Witch-doctor: The Way to Zulkash")].completed === false)
							{
								current_Adventure_Entered_String = "Doom of the Witch-doctor: The Way to Zulkash";
							}
							break;
						case "The Last Move: Yarkuch's Last Stand":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Deadly Package: Agent of the Darguul")].completed === false)
							{
								current_Adventure_Entered_String = "The Deadly Package: Agent of the Darguul";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Doom of the Witch-doctor: Zulkash, Herald of Woe")].completed === false)
							{
								current_Adventure_Entered_String = "Doom of the Witch-doctor: Zulkash, Herald of Woe";
							}
							break;

						//Three-Barrel Cove
						case "Old Grey Garl":
							if(current_Character_Level < 20)
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Troglodytes' Get")].completed === false)
								{
									current_Adventure_Entered_String = "The Troglodytes' Get";
								}
							}
							else
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Epic Old Grey Garl")].completed === true && table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Troglodytes' Get")].completed === false)
								{
									current_Adventure_Entered_String = "The Troglodytes' Get";
								}
							}
							break;
						case "Brood of Flame":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Stones Run Red")].completed === false || table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Brood of Flame")].completed === true)
							{
								current_Adventure_Entered_String = "The Stones Run Red";
							}
							break;

						//Delera's
						case "Free Delera":
							if(current_Character_Level < 20)
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Free Delera")].completed === true)
								{
									current_Adventure_Entered_String = "Return to Delera's Tomb";
								}
							}
							else
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Epic Free Delera")].completed === true)
								{
									current_Adventure_Entered_String = "Return to Delera's Tomb";
								}
							}
							break;

						//Sorrowdusk
						case "The Iron Mines: Freeing Achka":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Iron Mines: Freeing Achka")].completed === true)
							{
								current_Adventure_Entered_String = "The Iron Mines: Justice for Grust";
							}
							break;
						case "The Grey Moon's Den: The Trollish Scourge":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Grey Moon's Den: The Trollish Scourge")].completed === true)
							{
								current_Adventure_Entered_String = "The Grey Moon's Den: Extermination";
							}
							break;
						case "The Temple Outpost: The Libram of the Six":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Temple Outpost: Captives of the Cult")].completed === false)
							{
								current_Adventure_Entered_String = "The Temple Outpost: Captives of the Cult";
							}
							break;
						case "The Fane of the Six: Fall of the Prelate":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Fane of the Six: Cleansing the Temple")].completed === false)
							{
								current_Adventure_Entered_String = "The Fane of the Six: Cleansing the Temple";
							}
							break;
						case "The Sanctum: Quench the Flames":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Sanctum: Quench the Flames")].completed === true)
							{
								current_Adventure_Entered_String = "The Sanctum: Church of the Fury";
							}
							break;

						//Threnal
						case "Secure the Area":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic In Need of Supplies")].completed === false)
							{
								current_Adventure_Entered_String = "In Need of Supplies";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Rescue")].completed === false)
							{
								current_Adventure_Entered_String = "The Rescue";
							}
							break;
						case "Hold for Reinforcements":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Library of Threnal")].completed === false)
							{
								current_Adventure_Entered_String = "The Library of Threnal";
							}
							else if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic Escort the Expedition")].completed === false)
							{
								current_Adventure_Entered_String = "Escort the Expedition";
							}
							break;
						case "The Missing Expedition":
							if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic The Missing Expedition")].completed === true)
							{
								current_Adventure_Entered_String = "Entering the Gate Chamber";
							}
							break;

						//Ravenloft
						case "A Raven at the Door":
							if(current_Character_Level < 20)
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Heroic An Invitation to Dinner")].completed === false)
								{
									current_Adventure_Entered_String = "An Invitation to Dinner";
								}
							}
							else
							{
								if(table_Body_Array[adventure_Name_To_Table_Index_Map.get("Legendary An Invitation to Dinner")].completed === false)
								{
									current_Adventure_Entered_String = "An Invitation to Dinner";
								}
							}
							break;

						//Raids
						case "Legendary Tempest's Spine":
							if(current_Character_Level < 20)
							{
								current_Adventure_Entered_String = "Tempest's Spine";
							}
							break;
						case "The Legendary Shroud":
							if(current_Character_Level < 20)
							{
								current_Adventure_Entered_String = "The Shroud";
							}
							break;
						case "Legendary Vision of Destruction":
							if(current_Character_Level < 20)
							{
								current_Adventure_Entered_String = "A Vision of Destruction";
							}
							break;
						case "Legendary Master Artificer":
							if(current_Character_Level < 20)
							{
								current_Adventure_Entered_String = "The Master Artificer";
							}
							break;
						case "Legendary Lord of Blades":
							if(current_Character_Level < 20)
							{
								current_Adventure_Entered_String = "The Lord Of Blades";
							}
							break;
						case "Legendary Hound of Xoriat":
							if(last_Location_Entered_String === "The Subterrane - East")
							{
								current_Adventure_Entered_String = "Hound of Xoriat";
							}
							break;
					}
					if(current_Adventure_Entered_String !== "")
					{
						current_Adventure_Element.innerText = current_Adventure_Entered_String;
						last_Adventure_Time_Entered_String = result.data.last_update;
					}
					else
					{
						current_Adventure_Element.innerText = "None";
					}
				}
				else
				{
					current_Adventure_Element.innerText = "None";
				}
			}
			last_Location_ID_Entered = result.data.location_id;
			if(DDO_Audit_Location_ID_To_Area_Name_Map.has(last_Location_ID_Entered))
			{
				last_Location_Entered_String = DDO_Audit_Location_ID_To_Area_Name_Map.get(last_Location_ID_Entered);
				current_Location_Element.innerText = DDO_Audit_Location_ID_To_Area_Name_Map.get(last_Location_ID_Entered);
			}
			else
			{
				current_Location_Element.innerText = "Unknown Location";
			}
			if(current_Character_Level < 20)
			{
				current_Adventure_Tier = "Heroic";
			}
			else if(current_Character_Level < 30)
			{
				current_Adventure_Tier = "Epic";
			}
			else
			{
				current_Adventure_Tier = "Legendary";
			}
			autocomplete_Adventures_Error_Message_Element.innerText = "";
			retrieve_Character_Location_Error_Counter = 0;
			if(result.data.is_online === false)
			{
				current_Character_Name_Element.innerText = current_Character_Name_Element.innerText + ". Character is currently offline or location retrieval is experiencing issues and real-time character tracking may be offline";
			}
			if(group !== null)
			{
				let group_Member_IDs = Object.keys(group.data);
				let current_Highest_Level_Of_Group_Members = 1;
				for(let i = 0; i < group_Member_IDs.length; i++)
				{
					current_Highest_Level_Of_Group_Members = Math.max(current_Highest_Level_Of_Group_Members, group.data[group_Member_IDs[i]].total_level);
				}
//					current_Group_Size_Element.innerText = group_Member_IDs.length;
				current_Group_Size = group_Member_IDs.length;
				if(current_Highest_Level_Of_Group_Members !== highest_Level_Of_Group_Members)
				{
					highest_Level_Of_Group_Members = current_Highest_Level_Of_Group_Members;
					highest_Level_Of_Group_Members_Element.innerText = highest_Level_Of_Group_Members;
					character_Or_Group_Level_Changed();
				}
			}
			else
			{
//					current_Group_Size_Element.innerText = 1;
				current_Group_Size = 1;
				if(highest_Level_Of_Group_Members !== current_Character_Level)
				{
					highest_Level_Of_Group_Members = current_Character_Level;
					highest_Level_Of_Group_Members_Element.innerText = highest_Level_Of_Group_Members;
					character_Or_Group_Level_Changed();
				}
			}
		}
		catch(DDO_Audit_Error_Response)
		{
			retrieve_Character_Location_Error_Counter = retrieve_Character_Location_Error_Counter + 1;
			if(DDO_Audit_Error_Response.message === "404")
			{
				disable_Location_Retrieval("Unable to find the character \"" + character_Name_Input_Box_Element.value + "\" on the " + server_Dropdown_Menu_Element.value + " server. Please ensure both are correct and re-enable autocomplete.");
			}
			else if(retrieve_Character_Location_Error_Counter >= 3)
			{
				retrieve_Character_Location_Error_Counter = 0;
				disable_Location_Retrieval("An error was encountered repeatedly, location retrieval stopped. Real-time character tracking may be offline.");
			}
		}
	}
}

generate_Table_Headers();
if(window.localStorage.getItem("table_Body_Data") !== null)
{
	table_Body_Array = JSON.parse(window.localStorage.getItem("table_Body_Data"));

	level_Lower_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Level_Lower_Limit");
	level_Upper_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Level_Upper_Limit");

	total_Experience_Lower_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Experience_Lower_Limit");
	total_Experience_Upper_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Experience_Upper_Limit");

	time_Lower_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Time_Lower_Limit");
	time_Upper_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Time_Upper_Limit");

	total_Favor_Lower_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Favor_Lower_Limit");
	total_Favor_Upper_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Favor_Upper_Limit");

	experience_Weight_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Experience_Weight");
	reaper_Experience_Weight_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Reaper_Experience_Weight");
	favor_Weight_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Favor_Weight");
	custom_Weight_Multiplier_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Custom_Weight_Multiplier");
	weight_Over_Time_Lower_Limit_Input_Box_Element.value = window.localStorage.getItem("table_Filter_weight_Over_Time_Lower_Limit_Input_Box");

	if(window.localStorage.getItem("filter_Completed_Checkbox") === "true")	//Booleans are stored as text- default for all is false
	{
		filter_Completed_Checkbox_Element.checked = true;
	}

	for(let map_Entry of adventure_Pack_Name_To_Checkbox_Element_Map)
	{
		if(window.localStorage.getItem(map_Entry[0] + " Filter Checkbox") === "true")
		{
			map_Entry[1].checked = true;
		}
	}

	contains_Phrases_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Contains_Phrases_Input_Box");
	does_Not_Contain_Phrases_Input_Box_Element.value = window.localStorage.getItem("table_Filter_Does_Not_Contain_Phrases_Input_Box");

	const savedAscendingStates = JSON.parse(window.localStorage.getItem("last_Sort_Selection_Ascending_State_Array"));
	if(savedAscendingStates !== null)
	{
		for(let i = 0; i < table_Header_Row_Element.children.length && savedAscendingStates.length === table_Header_Row_Element.children.length; i++)
		{
			column_Properties[i].ascending = savedAscendingStates[i];
			update_Table_Header_View(i);
		}
	}

	table_Header_Row_Element.children[current_Sort_Selection].classList.remove("last_Sorted_Header");
	current_Sort_Selection = Number(window.localStorage.getItem("last_Sort_Selection"));
	table_Header_Row_Element.children[current_Sort_Selection].classList.add("last_Sorted_Header");

	character_Name_Input_Box_Element.value = window.localStorage.getItem("character_Name_Input_Box_Element");
	server_Dropdown_Menu_Element.value = window.localStorage.getItem("server_Dropdown_Menu_Element");
	if(window.localStorage.getItem("autocomplete_Adventures_On_Exit_Checkbox_Element") === "true")
	{
		autocomplete_Adventures_On_Exit_Checkbox_Element.checked = true;
		toggle_Location_Retrieval();
	}
}
generate_Initial_Table();