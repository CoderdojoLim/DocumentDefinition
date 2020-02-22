function ClearNodes(an_item)
{
	while(an_item.hasChildNodes())
	{
		an_item.removeChild(an_item.firstChild);
	}
}
function stars(parent, number)
{
	for(var i = 0; i < number; i++)
	{
		var star = document.createElement('img');
		star.setAttribute('src', 'ystar4.gif');
		parent.appendChild(star)
	}
}
function TestLocation(cities, city)
{
	var the_cities = cities.split(' ');
	for(var i = 0; i < the_cities.length; i++)
	{
		if(the_cities[i] == city)
		{
			return true;
		}
	}
	return false;
}
function DisplayFilm(parent, title, rating, director, cast, divide)
{
	var paragraph1 = document.createElement('p');
	paragraph1.setAttribute('className', 'MovieTitle');
	var paragraph_text1 = document.createTextNode(title + ' ');
	paragraph1.appendChild(paragraph_text1);
	stars(paragraph1, rating);

	var paragraph2 = document.createElement('p');
	var paragraph_text2A = document.createTextNode('Director: ' + director);
	var br = document.createElement('br');
	var paragraph_text2B = document.createTextNode('Cast: ' + cast);
	paragraph2.appendChild(paragraph_text2A);
	paragraph2.appendChild(br);
	paragraph2.appendChild(paragraph_text2B);

	if(divide)
	{
		var hr = document.createElement('hr');
		parent.appendChild(hr);
	}
	parent.appendChild(paragraph1);
	parent.appendChild(paragraph2);
}
function ListFilms(city_name)
{
	// Title
	var header = document.getElementById('title');
	ClearNodes(header);
	var header_text = document.createTextNode('Movies - '+city_name);
	header.appendChild(header_text);

	// Content
	var films_pointer = document.getElementById('the_films');
	ClearNodes(films_pointer);

	var filename = "films.xml";
	var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
	xmlDoc.load(filename);
	var nodes = xmlDoc.documentElement.childNodes;

	var notfirst = false;
	for(var current_node = nodes.item(0); current_node != null; current_node = current_node.nextSibling)
	{
		var film_city = current_node.getAttribute('location');
		if(city_name == 'All' || TestLocation(film_city, city_name))
		{
			var title, rating, director, cast;
			var child, gchildren, gchild;
			rating = current_node.getAttribute('rating');

			child = current_node.firstChild;
			title = child.text;

			child = child.nextSibling;
			director = MakeSet(child.firstChild, ' ');
			cast = MakeSets(child.nextSibling, ', ');

			DisplayFilm(films_pointer, title, rating, director, cast, notfirst);
			if(!notfirst)
				notfirst = true;
		}
	}
}
function MakeSets(nodes, delimiter)
{
	var astring = MakeSet(nodes.firstChild, ' ');
	for(nodes = nodes.nextSibling; nodes != null; nodes = nodes.nextSibling)
		astring += delimiter + MakeSet(nodes.firstChild, ' ');
	return astring;
}
function MakeSet(current_node, delimiter)
{
	var astring = current_node.text;
	for(current_node = current_node.nextSibling; current_node != null; current_node = current_node.nextSibling)
		astring += delimiter + current_node.text;
	return astring;
}
		