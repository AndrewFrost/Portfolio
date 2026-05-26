let saga_Titles = [];
let saga_Links = [];
let current_Saga_Names = [];
let current_Saga_Links = [];

for(let i = 0; i < table_Body_Array.length; i++)
{
	if(table_Body_Array[i].saga_Contribution != '-')
	{
		current_Saga_Names = table_Body_Array[i].saga_Contribution.split(', ');
		current_Saga_Links = table_Body_Array[i].saga_Link.split(', ');
		for(let j = 0; j < current_Saga_Names.length; j++)
		{
			if(saga_Titles.includes(current_Saga_Names[j]) === false)
			{
				saga_Titles.push(current_Saga_Names[j]);
				saga_Links.push(current_Saga_Links[j]);
			}
		}
	}
}

let sagas_Selection_Section_Text = "";
for(let i = 0; i < saga_Titles.length; i++)
{
	sagas_Selection_Section_Text = sagas_Selection_Section_Text + "				<span class = \"adventure_Pack_Filter_Title\"><a href = \"" + saga_Links[i] + "\">" + saga_Titles[i] + "</a>: </span><input type = \"checkbox\" class = \"saga_Checkbox\" value = \"" + saga_Titles[i] + "\"><br>\n";
}
console.log(sagas_Selection_Section_Text);

let adventure_Pack_Titles = [];
let adventure_Pack_Links = [];

current_Sort_Selection = column_Name_To_Array_Index.adventure_Pack;
table_Body_Array.sort(generic_Stable_Sort);
for(let i = 0; i < table_Body_Array.length; i++)
{
	if(table_Body_Array[i].adventure_Pack !== "Free to Play")
	{
		if(adventure_Pack_Titles.includes(table_Body_Array[i].adventure_Pack) === false)
		{
			adventure_Pack_Titles.push(table_Body_Array[i].adventure_Pack);
			adventure_Pack_Links.push(table_Body_Array[i].adventure_Pack_Link);
		}
	}
}

let adventure_Pack_Selection_Section_Text = "				<span class = \"adventure_Pack_Filter_Title\"><a href = \"https://ddowiki.com/page/Guide_to_Free_to_Play\">Free to Play</a>: </span><input type = \"checkbox\" class = \"adventure_Pack_Checkbox\" value = \"Free to Play\"><br>\n";
for(let i = 0; i < adventure_Pack_Titles.length; i++)
{
	adventure_Pack_Selection_Section_Text = adventure_Pack_Selection_Section_Text + "				<span class = \"adventure_Pack_Filter_Title\"><a href = \"" + adventure_Pack_Links[i] + "\">" + adventure_Pack_Titles[i] + "</a>: </span><input type = \"checkbox\" class = \"adventure_Pack_Checkbox\" value = \"" + adventure_Pack_Titles[i] + "\"><br>\n";
}
console.log(adventure_Pack_Selection_Section_Text);

current_Sort_Selection = column_Name_To_Array_Index.adventure_Name;
table_Body_Array.sort(generic_Stable_Sort);
current_Sort_Selection = column_Name_To_Array_Index.total_Favor;
table_Body_Array.sort(generic_Stable_Sort);
current_Sort_Selection = column_Name_To_Array_Index.base_Experience;
table_Body_Array.sort(generic_Stable_Sort);
current_Sort_Selection = column_Name_To_Array_Index.location;
table_Body_Array.sort(generic_Stable_Sort);
current_Sort_Selection = column_Name_To_Array_Index.level;
table_Body_Array.sort(generic_Stable_Sort);