import React from "react"
import Card from "../../components/card/Card"
import Button from "../../components/button/Button"
export default function CollectedIcons() {
  return (
    <Card className="flex items-center mx-5 rounded-lg mt-5" size="100%">
      <p className="text-3xl font-semibold mb-1">획득 아이콘</p>
      <Button text="대표 아이콘 변경" height="h-9" />
    </Card>
  )
}
