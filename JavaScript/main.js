var currently_Displayed_Page_Layout_Element_Index = -1;	//Used for page swapping- initial state is set from a call to redirect_Page_Content() -> display_Selected_Page_Content(0 - 2)
const page_Layout_Elements_Array = [{page_Content_Element: document.getElementById("About_Me_Page_Content"), title_Bar_Selection_Element: document.getElementById("About_Me_Title_Bar_Item"), background_Image_Element: document.getElementById("background_Image_About_Me")}, {page_Content_Element: document.getElementById("Projects_Page_Content"), title_Bar_Selection_Element: document.getElementById("Projects_Title_Bar_Item"), background_Image_Element: document.getElementById("background_Image_Projects")}, {page_Content_Element: document.getElementById("Résumé_Page_Content"), title_Bar_Selection_Element: document.getElementById("Résumé_Title_Bar_Item"), background_Image_Element: document.getElementById("background_Image_Résumé")}];

function display_Selected_Page_Content(new_Page_Layout_Element_Index)	//Sets the visible page content and selected menu bar item based on the index passed in, either from page selection elements directly or from redirect_Page_Content() when using the address bar or history navigation
{
	if(currently_Displayed_Page_Layout_Element_Index === -1)	//If the index is -1, we're in the initial redirect_Page_Content() call and set the first page up for viewing and set state appropriately
	{
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].title_Bar_Selection_Element.classList.toggle("title_Bar_Item_Current_Selection");
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].page_Content_Element.classList.toggle("hidden");
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].background_Image_Element.classList.toggle("invisible");
		currently_Displayed_Page_Layout_Element_Index = Number(new_Page_Layout_Element_Index);
	}
	else if(currently_Displayed_Page_Layout_Element_Index !== new_Page_Layout_Element_Index)	//If loading a new page, hide the current page and make the new page visible
	{
		page_Layout_Elements_Array[currently_Displayed_Page_Layout_Element_Index].title_Bar_Selection_Element.classList.toggle("title_Bar_Item_Current_Selection");
		page_Layout_Elements_Array[currently_Displayed_Page_Layout_Element_Index].page_Content_Element.classList.toggle("hidden");
		page_Layout_Elements_Array[currently_Displayed_Page_Layout_Element_Index].background_Image_Element.classList.toggle("invisible");
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].title_Bar_Selection_Element.classList.toggle("title_Bar_Item_Current_Selection");
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].page_Content_Element.classList.toggle("hidden");
		page_Layout_Elements_Array[new_Page_Layout_Element_Index].background_Image_Element.classList.toggle("invisible");
		currently_Displayed_Page_Layout_Element_Index = Number(new_Page_Layout_Element_Index);
	}
}

function redirect_Page_Content()	//Allows opening new tabs or windows from the title bar into a specific section and is called to initialize the page state along with any time a page is navigated in history
{
	var initial_Page_Content_String_Array = window.location.hash.split("#");
	if(initial_Page_Content_String_Array.length === 2 && Number(initial_Page_Content_String_Array[1]) >= 0 && Number(initial_Page_Content_String_Array[1]) < page_Layout_Elements_Array.length)
	{
		if(Number(initial_Page_Content_String_Array[1]) !== currently_Displayed_Page_Layout_Element_Index)
		{
			display_Selected_Page_Content(Number(initial_Page_Content_String_Array[1]));
		}
	}
	else
	{
		window.history.replaceState(null, "", "#0");	//Defaults any invalid URL to be the About Me section
		display_Selected_Page_Content(0);
	}
}
window.onpopstate = redirect_Page_Content;	//Will trigger redirect_Page_Content() when the a user navigates their browser history
redirect_Page_Content();					//Redirects when the page is first loaded, defaulting to the About Me section

function toggle_Element_Collapse(target_Element_ID)	//Used when collapsing or expanding elements that don't have headers such as through a button; ensure it has the collapsible_Element class
{
	document.getElementById(target_Element_ID).classList.toggle("collapsed_Element");
}

function toggle_Header_Collapse(element_To_Toggle)	//Only use on header class elements and ensure the header is the sibling just before the element to collapse, and the element to collapse has the collapsible_Element class
{
	element_To_Toggle.classList.toggle("collapsed_Header");
	element_To_Toggle.nextElementSibling.classList.toggle("collapsed_Element");
}

function collapsible_Element_Key_Pressed(event, element_To_Toggle)	//Project's list key event handler for navigating and opening/collapsing projects with the keyboard- requires proper HTML layout, see project_Section_Holder in index.html for current implementation
{
	switch(event.key)
	{
		case "Enter":
		case " ":		//Toggles a selection's collapse state
			toggle_Header_Collapse(element_To_Toggle);
			event.preventDefault();
			break;

		case "ArrowUp":	//Moves the focus to the previous selection
			if(element_To_Toggle.parentNode.classList.contains("project_Section"))
			{
				if(element_To_Toggle.parentNode.previousElementSibling !== null)
				{
					if(element_To_Toggle.parentNode.previousElementSibling.firstElementChild.classList.contains("collapsed_Header"))
					{
						element_To_Toggle.parentNode.previousElementSibling.firstElementChild.focus();	//Moves the focus to the previous project_Section if it is collapsed
					}
					else
					{
						element_To_Toggle.parentNode.previousElementSibling.children[1].lastElementChild.firstElementChild.focus();	//Moves the focus to the last project_Holder in the previous project_Section if it is not collapsed
					}
				}
			}
			else if(element_To_Toggle.parentNode.classList.contains("project_Holder"))
			{
				if(element_To_Toggle.parentNode.previousElementSibling !== null)
				{
					element_To_Toggle.parentNode.previousElementSibling.firstElementChild.focus();	//Moves the focus to the previous project_Holder unless it's the first project_Holder
				}
				else
				{
					element_To_Toggle.parentNode.parentNode.parentNode.firstElementChild.focus();	//Moves the focus to the containing project_Section if it's the first project_Holder
				}
			}
			event.preventDefault();
			break;

		case "ArrowRight":	//Expands out a selection
			if(element_To_Toggle.classList.contains("collapsed_Header"))
			{
				toggle_Header_Collapse(element_To_Toggle);	//Expands a project_Section or project_Holder if it is not currently collapsed
			}
			else if(element_To_Toggle.parentNode.classList.contains("project_Section"))
			{
				element_To_Toggle.nextElementSibling.firstElementChild.firstElementChild.focus();	//Move the focus to the first project_Holder in a project_Section if the project_Section is not collapsed
			}
			event.preventDefault();
			break;

		case "ArrowDown":	//Moves the focus to the next selection
			if(element_To_Toggle.parentNode.classList.contains("project_Section"))
			{
				if(element_To_Toggle.classList.contains("collapsed_Header"))
				{
					if(element_To_Toggle.parentNode.nextElementSibling !== null)
					{
						element_To_Toggle.parentNode.nextElementSibling.firstElementChild.focus();	//Moves the focus to the next project_Section for collapsed project_Sections unless it's the last project_Section
					}
				}
				else
				{
					element_To_Toggle.nextElementSibling.firstElementChild.firstElementChild.focus();	//Moves the focus to the first project_Holder of a non-collapsed project_Section
				}
			}
			else if(element_To_Toggle.parentNode.classList.contains("project_Holder"))
			{
				if(element_To_Toggle.parentNode.nextElementSibling !== null)
				{
					element_To_Toggle.parentNode.nextElementSibling.firstElementChild.focus();	//Moves the focus to the next project_Holder unless it's the last project_Holder in a project_Section
				}
				else if(element_To_Toggle.parentNode.parentNode.parentNode.nextElementSibling !== null)
				{
					element_To_Toggle.parentNode.parentNode.parentNode.nextElementSibling.firstElementChild.focus();	//Moves the focus from the last project_Holder to the next project_Section unless it's the last project_Section
				}
			}
			event.preventDefault();
			break;

		case "ArrowLeft":	//Collapses a selection
			if(element_To_Toggle.classList.contains("collapsed_Header") === false)
			{
				toggle_Header_Collapse(element_To_Toggle);	//Collapses a project_Section or project_Holder if it is not currently collapsed
			}
			else
			{
				if(element_To_Toggle.parentNode.classList.contains("project_Section"))
				{
					element_To_Toggle.parentNode.parentNode.firstElementChild.firstElementChild.focus();	//Moves the focus to the first project_Section (Video Games) when current project_Section is collapsed
				}
				else if(element_To_Toggle.parentNode.classList.contains("project_Holder"))
				{
					element_To_Toggle.parentNode.parentNode.parentNode.firstElementChild.focus();	//Moves the focus to the containing project_Section when the project_Holder is collapsed
				}
			}
			event.preventDefault();
			break;
	}
}

const expanded_Project_Image_Holder_Element = document.getElementById("expanded_Project_Image_Holder");
const expanded_Project_Image_Element = document.getElementById("expanded_Project_Image");
var original_Expanded_Project_Image_Element = expanded_Project_Image_Element;
function toggle_Image_Expand(event, element_To_Toggle)
{
	if(expanded_Project_Image_Element.src !== element_To_Toggle.src)	//If it's not already displayed, fill the display and show the expanded image if it's a click or the enter key-press while the element was the focus
	{
		if(event.type !== "keydown" || event.key === "Enter")
		{
			expanded_Project_Image_Holder_Element.style.display = "block";
			expanded_Project_Image_Element.src = element_To_Toggle.src;
			original_Expanded_Project_Image_Element = element_To_Toggle;
			expanded_Project_Image_Holder_Element.focus();
		}
	}
	else if(event.button !== 2)	//If it's already displayed, empty the expanded image holder and hide it unless the event was a right-click in case they want to save the expanded image or open it in a new tab
	{
		expanded_Project_Image_Holder_Element.style.display = "none";
		expanded_Project_Image_Element.src = "hidden.gif";	//Empty src can cause issues, hidden.gif is the filename for a very small gif
		original_Expanded_Project_Image_Element.focus();
	}
}

async function copy_To_Clipboard(target_Element_ID)
{
	try
	{
		await navigator.clipboard.writeText(document.getElementById(target_Element_ID).textContent);
		//Update to display a "Text copied" message near the button or cursor
	}
	catch
	{
		//Update to display a "Failed to copy" message near the button or cursor
		console.log("I am Error.");
	}
}