<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
		<head>
			<link rel="stylesheet" type="text/css" href="project.css"></link>
			<title>Films by City</title>
		</head>
		<body class="page">
		<h2 id="title">Movies - All</h2>
		<table id="Outer" bordercolor="#0066CC" border="1" cellpadding="0" cellspacing="0">
			<tr>
				<td>
					<table id="Menu">
						<tr>
							<td class="Header"><a href="films.xml">All</a></td>
							<td class="Header"><a href="films.xml">Limerick</a></td>
							<td class="Header"><a href="films.xml">Cork</a></td>
							<td class="Header"><a href="films.xml">Dublin</a></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
				<div class="Content" id="the_films">
					<xsl:apply-templates/>
				</div>
				</td>
			</tr>
			<tr><td id="Footer"><p class="Footer">CS4146 Project 2004</p></td></tr>
		</table>
		</body>
		</html>
	</xsl:template>
	<xsl:template match="film">
		<p class="MovieTitle"><font size="3">
		<xsl:apply-templates select="./title"/><xsl:text> </xsl:text>
		<xsl:call-template name="looper">
			<xsl:with-param name="iterations" select="@rating"/>
		</xsl:call-template> 
		</font>
		</p>
		<p>
			Director: <xsl:apply-templates select="director"/><br/>
			<xsl:text>Cast: </xsl:text>
			<xsl:for-each select="castmember">
				<xsl:apply-templates select="./firstname"/><xsl:text> </xsl:text><xsl:apply-templates select="./surname"/>
				<xsl:if test="position()!=last()">
					<xsl:text>, </xsl:text>
				</xsl:if>
			</xsl:for-each>
		</p>
		<xsl:if test="position()!=last()">
			<hr/>
		</xsl:if>
	</xsl:template>
	<xsl:template match="director">
		<xsl:apply-templates select="./firstname"/><xsl:text> </xsl:text><xsl:apply-templates select="./surname"/>
	</xsl:template>
	<xsl:template name="looper">
		<xsl:param name="iterations"/>
		
		<xsl:if test="$iterations > 0">
		<img src="ystar4.gif"/>
			<xsl:call-template name="looper">
				<xsl:with-param name="iterations" select="$iterations - 1"/>
			</xsl:call-template> 
		</xsl:if>
	</xsl:template>


</xsl:stylesheet>