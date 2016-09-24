package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsObject, JsString, JsValue, RootJsonFormat}

case class Type(name: String)

object Type extends DefaultJsonProtocol {

  implicit object StatsJsonFormat extends RootJsonFormat[List[Type]] {

    override def write(stats: List[Type]) = JsArray(
      stats.map(s => JsObject(
        "name" -> JsString(s.name)
      ))
    )

    override def read(value: JsValue) = {
      value match {
        case JsArray(types) =>
          types
            .toList
            .map(v => v.asJsObject)
            .map { o =>
              o.getFields("type") match {
                case Seq(JsObject(t)) =>
                  Type(t("name").convertTo[String])
              }
            }
        case _ =>
          throw DeserializationException("Pokemon types expected")
      }
    }
  }

}

